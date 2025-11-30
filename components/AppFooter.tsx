import React from 'react';
import { APP_VERSION } from '../version';

const AppFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900/95 md:sticky md:bottom-0 md:z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 text-[11px] text-slate-500 text-center md:text-left md:pl-6">
        <p>
          &copy; {new Date().getFullYear()} penningtonProgramming · Memory Card Trainer ·{' '}
          <span className="font-mono text-slate-400">v{APP_VERSION}</span>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
