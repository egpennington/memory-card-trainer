import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void; // still passed in, but we no longer render a second reset here
  practiceMode: 'manual' | 'timer';
  isStart: boolean;
  isEnd: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  // onReset,  // not used visually anymore (reset is next to Hide Card)
  practiceMode,
  isStart,
  isEnd,
}) => {
  const isTimer = practiceMode === 'timer';

  return (
    <>
      {/* Side arrows – now for ALL breakpoints, centered around the card */}
      <div
        className="
          absolute inset-y-0 left-1/2 -translate-x-1/2
          flex items-center justify-between
          pointer-events-none
          w-[22rem] sm:w-[26rem] lg:w-[28rem]
          px-2 sm:px-4
        "
      >
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isPlaying || isStart}
          className="
            pointer-events-auto
            p-3 md:p-4 rounded-full
            bg-slate-900/70 border border-slate-700/70
            text-slate-100 shadow-lg
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
          aria-label="Previous card"
        >
          <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={isPlaying || isEnd}
          className="
            pointer-events-auto
            p-3 md:p-4 rounded-full
            bg-slate-900/70 border border-slate-700/70
            text-slate-100 shadow-lg
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
          aria-label="Next card"
        >
          <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Timer play/pause – centered under card, only in Timer mode */}
      <div
        className={`
          absolute -bottom-6 left-1/2 -translate-x-1/2
          flex items-center justify-center
          ${isTimer ? 'gap-4' : 'hidden'}
        `}
      >
        <button
          onClick={onTogglePlay}
          className={`
            p-3 md:p-4 rounded-full shadow-lg active:scale-95
            ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'
            }
          `}
          aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" />
          ) : (
            <Play className="w-6 h-6 md:w-7 md:h-7 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </>
  );
};

export default Controls;
