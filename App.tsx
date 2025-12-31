'use client';

import React, { useState, useEffect } from 'react';
import { GamePhase, GameState, GameConfig, Language } from './types';
import { translations } from './utils/i18n';
import GameSetup from './components/GameSetup';
import Gameplay from './components/Gameplay';
import GameOver from './components/GameOver';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.SETUP);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [gameState, setGameState] = useState<GameState>({
    currentMin: 0,
    currentMax: 100,
    targetNumber: 0,
    history: []
  });

  const t = translations[lang];

  // Initialize Theme and sync with DOM
  useEffect(() => {
    // Check system preference or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const playSound = (type: 'tick' | 'boom') => {
    // Visual-only for now
  };

  const startGame = (config: GameConfig) => {
    const target = Math.floor(Math.random() * (config.maxRange - config.minRange - 1)) + config.minRange + 1;
    
    setGameState({
      currentMin: config.minRange,
      currentMax: config.maxRange,
      targetNumber: target,
      history: []
    });
    setPhase(GamePhase.PLAYING);
  };

  const handleGuess = (guess: number) => {
    const { targetNumber, currentMin, currentMax, history } = gameState;

    if (guess === targetNumber) {
      playSound('boom');
      setPhase(GamePhase.EXPLODED);
      return;
    }

    let newMin = currentMin;
    let newMax = currentMax;

    if (guess < targetNumber) {
      newMin = guess;
    } else {
      newMax = guess;
    }

    setGameState({
      ...gameState,
      currentMin: newMin,
      currentMax: newMax,
      history: [...history, guess]
    });
    
    playSound('tick');
  };

  const restartGame = () => {
    setPhase(GamePhase.SETUP);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-800 dark:via-slate-900 dark:to-black dark:text-slate-100 flex flex-col">
      {/* Header / Status Bar */}
      <header className="p-4 flex justify-between items-center border-b border-slate-300 dark:border-slate-800/50 bg-white/50 dark:bg-transparent backdrop-blur-sm">
        <div className="font-bold text-slate-500 text-xs tracking-widest">
            NB-SYS v2.4
        </div>
        <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold px-2 py-1 rounded border border-slate-400 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
               {lang === 'en' ? '中文' : 'EN'}
            </button>
            <div className="flex gap-2">
                 <div className={`h-2 w-2 rounded-full ${phase === GamePhase.PLAYING ? 'bg-green-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
                 <div className={`h-2 w-2 rounded-full ${phase === GamePhase.EXPLODED ? 'bg-red-500' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
            </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {phase === GamePhase.SETUP && (
          <GameSetup onStartGame={startGame} t={t} />
        )}

        {phase === GamePhase.PLAYING && (
          <Gameplay 
            gameState={gameState} 
            onGuess={handleGuess} 
            t={t}
          />
        )}

        {phase === GamePhase.EXPLODED && (
          <GameOver 
            targetNumber={gameState.targetNumber} 
            onRestart={restartGame} 
            t={t}
            lang={lang}
          />
        )}
      </main>
      
      <footer className="p-4 text-center text-slate-500 dark:text-slate-600 text-xs">
        Powered by React & Gemini AI
      </footer>
    </div>
  );
};

export default App;