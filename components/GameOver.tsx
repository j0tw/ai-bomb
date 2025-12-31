import React, { useEffect, useState } from 'react';
import { generatePunishment } from '../services/geminiService';
import { Translations, Language } from '../types';

interface GameOverProps {
  targetNumber: number;
  onRestart: () => void;
  t: Translations;
  lang: Language;
}

const GameOver: React.FC<GameOverProps> = ({ targetNumber, onRestart, t, lang }) => {
  const [punishment, setPunishment] = useState<string>(t.gameover.deciphering);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPunishment = async () => {
      try {
        const result = await generatePunishment(lang);
        if (isMounted) {
            setPunishment(result);
            setIsLoading(false);
        }
      } catch (e) {
         if (isMounted) {
             setPunishment(t.gameover.defaultPunishment);
             setIsLoading(false);
         }
      }
    };

    fetchPunishment();
    return () => { isMounted = false; };
  }, [lang, t.gameover.defaultPunishment]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 text-center animate-shake">
      
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="text-8xl mb-2 relative z-10">💥</div>
        <h2 className="text-5xl font-black text-red-600 dark:text-red-500 tracking-tighter drop-shadow-red relative z-10">
          {t.gameover.boom}
        </h2>
      </div>

      <div className="mb-8">
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-2 font-medium">{t.gameover.hiddenNumberWas}</p>
        <div className="text-6xl digital-font text-slate-900 dark:text-white drop-shadow-lg font-bold">
          {targetNumber}
        </div>
      </div>

      <div className="w-full bg-white dark:bg-slate-800/80 border border-red-300 dark:border-red-500/50 p-6 rounded-xl mb-8 shadow-xl shadow-red-900/10 transition-colors duration-300">
        <h3 className="text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-3 text-sm flex items-center justify-center gap-2">
           <span>⚠️</span> {t.gameover.forfeitRequired} <span>⚠️</span>
        </h3>
        {isLoading ? (
             <div className="flex justify-center space-x-2 animate-pulse py-4">
                <div className="w-3 h-3 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
             </div>
        ) : (
            <p className="text-xl text-slate-800 dark:text-white font-medium leading-relaxed">
            "{punishment}"
            </p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 bg-slate-900 hover:bg-slate-700 dark:bg-white text-white dark:text-slate-900 dark:hover:bg-slate-200 font-bold text-xl rounded-xl shadow-xl transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {t.gameover.playAgain}
      </button>
    </div>
  );
};

export default GameOver;