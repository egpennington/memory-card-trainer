import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  practiceMode: 'manual' | 'timer';
  isStart: boolean;
  isEnd: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev, 
  onReset, 
  practiceMode,
  isStart,
  isEnd
}) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto p-4 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700/50">
      
      {/* Previous */}
      <button 
        onClick={onPrev}
        disabled={isPlaying || isStart}
        className="p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous Card"
      >
        <SkipBack className="w-6 h-6" />
      </button>

      {/* Play/Pause (Timer Mode) or Reset (Manual Mode - optional location) */}
      {practiceMode === 'timer' ? (
        <button 
          onClick={onTogglePlay}
          className={`p-4 rounded-full shadow-lg transform transition-all active:scale-95 ${
            isPlaying 
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' 
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'
          }`}
          aria-label={isPlaying ? "Pause" : "Start Auto-Play"}
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>
      ) : (
         <button 
          onClick={onReset}
          className="p-4 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-lg transition-all active:scale-95"
          aria-label="Reset Deck"
        >
          <RefreshCw className="w-8 h-8" />
        </button>
      )}

      {/* Next */}
      <button 
        onClick={onNext}
        disabled={isPlaying || isEnd}
        className="p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next Card"
      >
        <SkipForward className="w-6 h-6" />
      </button>

      {/* Reset for Timer Mode (small button on side) */}
      {practiceMode === 'timer' && (
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden sm:block">
           <button 
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            title="Reset Session"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
