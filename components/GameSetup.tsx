import React, { useState } from 'react';
import { GameConfig, Translations } from '../types';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
  t: Translations;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, t }) => {
  const [maxRange, setMaxRange] = useState<number>(100);

  const handleStart = () => {
    onStartGame({ minRange: 0, maxRange });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 p-6 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-500 drop-shadow-lg tracking-wider whitespace-pre-wrap">
          {t.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium">
          {t.subtitle}
        </p>
      </div>

      <div className="w-full bg-white/70 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-xl transition-colors duration-300">
        <label className="block text-slate-700 dark:text-slate-300 mb-4 text-lg font-semibold">
          {t.setup.maxNumber}
        </label>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button 
            onClick={() => setMaxRange(Math.max(10, maxRange - 10))}
            className="w-12 h-12 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xl transition-colors shadow-sm"
          >
            -
          </button>
          <div className="text-4xl digital-font text-cyan-600 dark:text-cyan-400 w-24 text-center">
            {maxRange}
          </div>
          <button 
            onClick={() => setMaxRange(Math.min(999, maxRange + 10))}
            className="w-12 h-12 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xl transition-colors shadow-sm"
          >
            +
          </button>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xl rounded-xl shadow-lg shadow-red-900/20 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.setup.armBomb}
        </button>
      </div>
    </div>
  );
};

export default GameSetup;