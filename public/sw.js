const CACHE_NAME = "memory-trainer-v1";
const OFFLINE_URLS = [
  "/",
  "/index.html",
  "/site.webmanifest"
  // you can add more static assets here if you want
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => (key === CACHE_NAME ? null : caches.delete(key)))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          // fallback to index for navigation when offline
          event.request.mode === "navigate"
            ? caches.match("/index.html")
            : undefined
        )
      );
    })
  );
});
