import React from 'react';

interface StatsTrackerProps {
  currentIndex: number;
  totalCards: number;
  startTime: number | null;
}

const StatsTracker: React.FC<StatsTrackerProps> = ({ currentIndex, totalCards, startTime }) => {
  const progress = Math.round(((currentIndex + 1) / totalCards) * 100);
  
  // A simple duration tracker could be added here if needed, but for now just cards/progress
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end text-sm">
         <span className="text-slate-400 font-medium">Progress</span>
         <span className="font-mono text-indigo-300 font-bold">{currentIndex + 1} <span className="text-slate-500">/</span> {totalCards}</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StatsTracker;
