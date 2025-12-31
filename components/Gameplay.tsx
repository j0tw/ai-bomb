import React, { useMemo, useState } from 'react';
import { GameState, Translations } from '../types';

interface GameplayProps {
  gameState: GameState;
  onGuess: (guess: number) => void;
  t: Translations;
}

const Gameplay: React.FC<GameplayProps> = ({ gameState, onGuess, t }) => {
  const { currentMin, currentMax, targetNumber } = gameState;
  const [exitingNumbers, setExitingNumbers] = useState<Set<number>>(new Set());

  // Calculate all valid numbers strictly between min and max
  const validNumbers = useMemo(() => {
    const numbers = [];
    for (let i = currentMin + 1; i < currentMax; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [currentMin, currentMax]);

  const handleNumberClick = (num: number) => {
    if (num === targetNumber) {
        // Boom immediately
        onGuess(num);
        return;
    }

    // Determine which numbers will be removed based on the guess
    const newExiting = new Set<number>();
    
    // Add the guessed number itself (it always disappears unless it's the target)
    newExiting.add(num);

    if (num < targetNumber) {
        // All numbers <= num will disappear
        for (let i = currentMin + 1; i <= num; i++) {
            newExiting.add(i);
        }
    } else {
        // All numbers >= num will disappear
        for (let i = num; i < currentMax; i++) {
            newExiting.add(i);
        }
    }

    setExitingNumbers(newExiting);

    // Wait for animation to finish before updating state
    setTimeout(() => {
        onGuess(num);
        setExitingNumbers(new Set());
    }, 400); // Match CSS animation duration
  };

  // Visual intensity based on how narrow the range is
  const rangeSpan = currentMax - currentMin;
  const intensity = Math.min(1, Math.max(0, 1 - rangeSpan / 50)); 
  
  return (
    <div className={`flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4 transition-colors duration-1000 ${intensity > 0.8 ? 'bg-red-100 dark:bg-red-950/30' : ''} rounded-3xl`}>
      
      {/* Bomb Visual */}
      <div className={`relative w-32 h-32 md:w-40 md:h-40 mb-6 flex items-center justify-center`}>
        <div className={`absolute inset-0 rounded-full border-4 border-slate-700 bg-slate-800 dark:bg-slate-900 shadow-2xl ${intensity > 0.5 ? 'animate-pulse-red' : ''}`}></div>
        <div className="z-10 text-center">
            <span className="text-5xl md:text-6xl mb-1 block">💣</span>
            <div className="text-[10px] md:text-xs text-red-500 digital-font tracking-widest uppercase font-bold">
                {intensity > 0.8 ? t.gameplay.critical : t.gameplay.armed}
            </div>
        </div>
        {/* Fuse visual */}
        <svg className="absolute -top-10 right-2 w-10 h-20" viewBox="0 0 50 100">
             <path d="M25,100 Q25,50 50,0" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="4 2" />
             {intensity > 0.3 && <circle cx="50" cy="0" r="4" fill="#ef4444" className="animate-ping" />}
        </svg>
      </div>

      {/* Range Display */}
      <div className="w-full max-w-md bg-white/60 dark:bg-black/40 p-4 rounded-2xl border border-slate-300 dark:border-slate-700 mb-6 backdrop-blur-md shadow-lg dark:shadow-none transition-colors duration-300">
        <div className="flex items-center justify-between px-4">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 mb-1 font-bold">{t.gameplay.min}</div>
            <div className="text-3xl md:text-4xl digital-font text-cyan-600 dark:text-cyan-400">{currentMin}</div>
          </div>
          <div className="text-slate-400 dark:text-slate-600 text-xl font-light">
             &lt; ? &gt;
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-500 mb-1 font-bold">{t.gameplay.max}</div>
            <div className="text-3xl md:text-4xl digital-font text-orange-500 dark:text-orange-400">{currentMax}</div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mb-4">
        <p className="text-slate-500 dark:text-slate-400 text-sm animate-pulse font-medium">
          {t.gameplay.tapToGuess}
        </p>
      </div>

      {/* Number Grid */}
      <div className="w-full bg-slate-200/50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-300 dark:border-slate-800 shadow-inner max-h-[50vh] overflow-y-auto custom-scrollbar transition-colors duration-300">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
          {validNumbers.map((num) => {
            const isExiting = exitingNumbers.has(num);
            return (
                <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={exitingNumbers.size > 0} // Disable all while animating
                className={`
                    aspect-square flex items-center justify-center 
                    bg-white dark:bg-slate-800 
                    hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:text-white dark:hover:from-cyan-600 dark:hover:to-blue-700 
                    text-cyan-700 dark:text-cyan-400 font-bold rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm dark:shadow-lg 
                    transition-all text-lg md:text-xl digital-font group
                    ${isExiting ? 'animate-scale-out bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-500/50 text-red-500 dark:text-red-300 pointer-events-none' : 'active:scale-90'}
                `}
                >
                <span className={`transition-transform ${!isExiting && 'group-hover:scale-110'}`}>
                    {num}
                </span>
                </button>
            );
          })}
        </div>
      </div>
      
      {/* Scroll indicator if list is long */}
      {validNumbers.length > 40 && (
         <div className="text-slate-500 dark:text-slate-600 text-xs mt-2">
            {t.gameplay.scroll}
         </div>
      )}

    </div>
  );
};

export default Gameplay;