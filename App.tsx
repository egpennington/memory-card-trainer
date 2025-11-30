import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, DeckType, PracticeMode } from './types';
import { generateDeck } from './utils/deckUtils';
import CardViewer from './components/CardViewer';
import Controls from './components/Controls';
import SettingsPanel from './components/SettingsPanel';
import StatsTracker from './components/StatsTracker';
import { Layers } from 'lucide-react';
import AppFooter from './components/AppFooter';

const App: React.FC = () => {
  // State
  const [deck, setDeck] = useState<Card[]>([]);
  const [deckType, setDeckType] = useState<DeckType>('mnemonica');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Default to face up for memorizing
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('manual');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedSeconds, setSpeedSeconds] = useState(2.0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  
  // Refs for interval management
  const timerRef = useRef<number | null>(null);

  // Initialize Deck
  useEffect(() => {
    const newDeck = generateDeck(deckType);
    setDeck(newDeck);
    resetSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckType]);

  const resetSession = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setIsFlipped(false);
    setSessionStartTime(null);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Timer Logic
  useEffect(() => {
    if (isPlaying && practiceMode === 'timer') {
      if (!sessionStartTime) setSessionStartTime(Date.now());
      
      timerRef.current = window.setInterval(() => {
        handleNextCard(true); // Auto advance
      }, speedSeconds * 1000);
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, practiceMode, speedSeconds, currentIndex, deck.length, sessionStartTime]);

  // Handlers
  const handleNextCard = useCallback((auto: boolean = false) => {
    setCurrentIndex(prev => {
      if (prev >= deck.length - 1) {
        if (auto) setIsPlaying(false); // Stop if at end
        return prev;
      }
      return prev + 1;
    });
    // In manual mode, we might want to keep the flip state or reset it? 
    // Usually for memorizing, you keep face up. 
    // If practicing recall (flip state true), maybe reset to hidden for next card?
    // Let's keep state consistent for now.
  }, [deck.length]);

  const handlePrevCard = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleTogglePlay = () => {
    if (currentIndex >= deck.length - 1) {
      // If at end, restart
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleFlipToggle = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (practiceMode === 'timer') handleTogglePlay();
        else handleFlipToggle();
      } else if (e.code === 'ArrowRight') {
        if (!isPlaying) handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        if (!isPlaying) handlePrevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [practiceMode, isPlaying, handleNextCard, isFlipped]);

  const currentCard = deck[currentIndex];

  if (!currentCard) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Deck...</div>;

  return (
  <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
    {/* Main layout area */}
    <div className="flex-1 flex flex-col md:flex-row overflow-x-hidden relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-20">
        <div className="flex items-center gap-2">
          <Layers className="text-indigo-500 w-6 h-6" />
          <h1 className="font-bold text-lg tracking-tight">
            Mnemonica<span className="text-indigo-400">Trainer</span>
          </h1>
        </div>
        <div className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
          {deckType === 'mnemonica' ? 'Mnemonic' : 'Random'}
        </div>
      </div>

      {/* Sidebar / Settings Area */}
      <aside className="w-full md:w-80 md:h-screen bg-slate-900 md:border-r border-slate-800 p-6 flex flex-col gap-8 z-10 overflow-y-auto">
        <div className="hidden md:flex items-center gap-2 mb-2">
          <Layers className="text-indigo-500 w-8 h-8" />
          <h1 className="font-bold text-2xl tracking-tight">
            Mnemonica<span className="text-indigo-400">Trainer</span>
          </h1>
        </div>

        <div className="flex-1 space-y-8">
          <SettingsPanel
            deckType={deckType}
            setDeckType={setDeckType}
            practiceMode={practiceMode}
            setPracticeMode={mode => {
              setPracticeMode(mode);
              setIsPlaying(false);
            }}
            speedSeconds={speedSeconds}
            setSpeedSeconds={setSpeedSeconds}
            isPlaying={isPlaying}
          />

          <div className="hidden md:block">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Keyboard Shortcuts
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex justify-between">
                  <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-mono">Space</span>
                  <span>{practiceMode === 'timer' ? 'Play / Pause' : 'Flip Card'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-mono">→</span>
                  <span>Next Card</span>
                </li>
                <li className="flex justify-between">
                  <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-mono">←</span>
                  <span>Prev Card</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-600 pb-4 md:pb-0">
          Train your memory. Master the stack.
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-60px)] md:h-screen relative flex flex-col">
        {/* Top Bar Stats */}
        <div className="w-full p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <StatsTracker
              currentIndex={currentIndex}
              totalCards={deck.length}
              startTime={sessionStartTime}
            />
          </div>
        </div>

        {/* Card Viewer Area */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          <div className="relative z-10">
            <CardViewer
              card={currentCard}
              isFlipped={isFlipped}
              onFlipToggle={handleFlipToggle}
              onClick={() => {
                if (practiceMode === 'manual') handleFlipToggle();
              }}
            />
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <div className="w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl absolute -top-20 -right-20" />
            <div className="w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-3xl absolute -bottom-20 -left-20" />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="w-full p-4 md:p-8 z-20">
          <Controls
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onNext={() => handleNextCard()}
            onPrev={handlePrevCard}
            onReset={resetSession}
            practiceMode={practiceMode}
            isStart={currentIndex === 0}
            isEnd={currentIndex === deck.length - 1}
          />
        </div>
      </main>
    </div>

    {/* Footer at the very bottom */}
    <AppFooter />
  </div>
);

};

export default App;
