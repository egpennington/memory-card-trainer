import React from 'react';
import { Card } from '../types';
import { Eye, EyeOff, RefreshCw } from 'lucide-react'; // ⬅️ add RefreshCw

interface CardViewerProps {
  card: Card;
  isFlipped: boolean;
  onFlipToggle: () => void;
  onClick: () => void;
  onReset: () => void;          // ⬅️ add this
}

// Map suits to Lucide icons or standard SVG paths for better scalability
const SuitIcon = ({ suit, className }: { suit: string; className?: string }) => {
  if (suit === 'hearts') return <span className={`text-red-500 ${className}`}>♥</span>;
  if (suit === 'diamonds') return <span className={`text-red-500 ${className}`}>♦</span>;
  if (suit === 'clubs') return <span className={`text-slate-900 ${className}`}>♣</span>;
  return <span className={`text-slate-900 ${className}`}>♠</span>; // spades
};

const CardViewer: React.FC<CardViewerProps> = ({
  card,
  isFlipped,
  onFlipToggle,
  onClick,
  onReset,        // ⬅️ and here
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 perspective-1000">

      {/* Card Container */}
      <div
        className="relative w-52 h-72 sm:w-64 sm:h-96 lg:w-72 lg:h-[26rem] cursor-pointer group"
        onClick={onClick}
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-all ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-2xl backface-hidden flex flex-col justify-between p-4 select-none border border-slate-200">
            {/* Top Left */}
            <div className="flex flex-col items-center self-start">
              <span
                className={`text-2xl sm:text-3xl font-bold font-serif ${
                  card.color === 'red' ? 'text-red-500' : 'text-slate-900'
                }`}
              >
                {card.rank}
              </span>
              <SuitIcon suit={card.suit} className="text-2xl" />
            </div>

            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transform scale-[2.4] sm:scale-[3]">
                <SuitIcon suit={card.suit} className="text-5xl sm:text-6xl" />
              </div>
            </div>

            {/* Bottom Right */}
            <div className="flex flex-col items-center self-end transform rotate-180">
              <span
                className={`text-2xl sm:text-3xl font-bold font-serif ${
                  card.color === 'red' ? 'text-red-500' : 'text-slate-900'
                }`}
              >
                {card.rank}
              </span>
              <SuitIcon suit={card.suit} className="text-2xl" />
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 w-full h-full bg-slate-800 rounded-xl shadow-2xl backface-hidden rotate-y-180 border-4 border-white flex items-center justify-center">
            <div
              className="w-full h-full rounded-lg bg-blue-600 opacity-80"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)',
                backgroundSize: '10px 10px',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-white opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide / Reset row */}
      <div className="flex items-center gap-3">
        {/* Hide / Reveal */}
        <button
          onClick={e => {
            e.stopPropagation();
            onFlipToggle();
          }}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          {isFlipped ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>{isFlipped ? 'Reveal Card' : 'Hide Card'}</span>
        </button>

        {/* ✅ Reset deck to the right */}
        <button
          onClick={e => {
            e.stopPropagation();
            onReset();
          }}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-300 text-xs font-medium shadow-sm"
          aria-label="Reset deck"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default CardViewer;
