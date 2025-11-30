// sw.js for Memory Card Trainer
const CACHE_VERSION = 'v1';
const CACHE_NAME = `memorytrainer-pwa-${CACHE_VERSION}-${self.registration.scope || ''}`
  .replace(/[^a-z0-9\-]/gi, '');

// Keep this list SMALL and only include files that are truly at those paths
// and rarely change. JS bundles are hashed by Vite, so we let them be
// cached at runtime instead of hard-coding a filename.
const STATIC_ASSETS = [
  '/',                    // start URL
  '/index.html',
  '/styles.css',
  '/site.webmanifest',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
];

// ----- ACTIVATE -----
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // enable navigation preload if supported
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
    // clean old caches
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    );
  })());
  self.clients.claim();
});

// ----- INSTALL -----
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // add assets individually so one 404 doesn’t break install
    await Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url)));
  })());
  self.skipWaiting();
});

// ----- FETCH -----
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== 'GET') return;

  // Navigation requests → app-shell with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;

        const net = await fetch(request);
        return net;
      } catch {
        const cache = await caches.open(CACHE_NAME);
        const cachedShell = await cache.match('/index.html');
        return (
          cachedShell ||
          new Response('Offline', { status: 503, statusText: 'Offline' })
        );
      }
    })());
    return;
  }

  const sameOrigin = new URL(request.url).origin === location.origin;

  // Same-origin: stale-while-revalidate
  if (sameOrigin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      const fetchAndUpdate = fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            cache.put(request, res.clone());
          }
          return res;
        })
        .catch(() => undefined);

      return cached || fetchAndUpdate || new Response('Offline', {
        status: 503,
        statusText: 'Offline',
      });
    })());
    return;
  }

  // Cross-origin: network first, optional cache fallback
  event.respondWith((async () => {
    try {
      return await fetch(request);
    } catch {
      const cached = await caches.match(request);
      return (
        cached ||
        new Response('Offline', { status: 503, statusText: 'Offline' })
      );
    }
  })());
});
