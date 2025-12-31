export enum GamePhase {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  EXPLODED = 'EXPLODED'
}

export interface GameConfig {
  minRange: number;
  maxRange: number;
}

export interface GameState {
  currentMin: number;
  currentMax: number;
  targetNumber: number;
  history: number[];
}

export type Language = 'en' | 'zh';

export interface Translations {
  title: string;
  subtitle: string;
  setup: {
    maxNumber: string;
    armBomb: string;
  };
  gameplay: {
    min: string;
    max: string;
    armed: string;
    critical: string;
    tapToGuess: string;
    scroll: string;
  };
  gameover: {
    boom: string;
    hiddenNumberWas: string;
    forfeitRequired: string;
    deciphering: string;
    playAgain: string;
    defaultPunishment: string;
    errorPunishment: string;
  };
}