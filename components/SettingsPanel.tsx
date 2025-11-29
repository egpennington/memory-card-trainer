import React from 'react';
import { DeckType, PracticeMode } from '../types';
import { Brain, Shuffle, Clock, Hand, Settings2 } from 'lucide-react';

interface SettingsPanelProps {
  deckType: DeckType;
  setDeckType: (t: DeckType) => void;
  practiceMode: PracticeMode;
  setPracticeMode: (m: PracticeMode) => void;
  speedSeconds: number;
  setSpeedSeconds: (s: number) => void;
  isPlaying: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  deckType,
  setDeckType,
  practiceMode,
  setPracticeMode,
  speedSeconds,
  setSpeedSeconds,
  isPlaying
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-6 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-6 text-slate-200 border-b border-slate-700 pb-3">
        <Settings2 className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold">Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* Deck Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deck Order</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDeckType('mnemonica')}
              disabled={isPlaying}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                deckType === 'mnemonica'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Brain className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Mnemonica</span>
            </button>
            <button
              onClick={() => setDeckType('random')}
              disabled={isPlaying}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                deckType === 'random'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Shuffle className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Random</span>
            </button>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Mode</label>
          <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setPracticeMode('manual')}
              disabled={isPlaying}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                practiceMode === 'manual'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hand className="w-4 h-4" /> Manual
            </button>
            <button
              onClick={() => setPracticeMode('timer')}
              disabled={isPlaying}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                practiceMode === 'timer'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" /> Timer
            </button>
          </div>
        </div>

        {/* Speed Control (Only visible in Timer mode) */}
        <div className={`space-y-3 transition-all duration-300 overflow-hidden ${practiceMode === 'timer' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speed</label>
            <span className="text-sm font-mono text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded">{speedSeconds.toFixed(1)}s / card</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={speedSeconds}
            onChange={(e) => setSpeedSeconds(parseFloat(e.target.value))}
            disabled={isPlaying}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
             <span>Fast</span>
             <span>Slow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
