import { Translations } from '../types';

export const translations: Record<'en' | 'zh', Translations> = {
  en: {
    title: "NUMBER\nBOMB",
    subtitle: "Avoid the hidden number. Pass the device. Don't explode.",
    setup: {
      maxNumber: "Set Maximum Number",
      armBomb: "ARM THE BOMB"
    },
    gameplay: {
      min: "MIN",
      max: "MAX",
      armed: "ARMED",
      critical: "CRITICAL",
      tapToGuess: "Tap a number to guess",
      scroll: "Scroll for more numbers"
    },
    gameover: {
      boom: "BOOM!",
      hiddenNumberWas: "The hidden number was",
      forfeitRequired: "Forfeit Required",
      deciphering: "Deciphering forfeit...",
      playAgain: "PLAY AGAIN",
      defaultPunishment: "Do a silly dance for 30 seconds!",
      errorPunishment: "Tell a joke to the group!"
    }
  },
  zh: {
    title: "數字\n炸彈",
    subtitle: "避開隱藏的數字。傳遞裝置。小心爆炸。",
    setup: {
      maxNumber: "設定最大數字",
      armBomb: "啟動炸彈"
    },
    gameplay: {
      min: "最小",
      max: "最大",
      armed: "已啟動",
      critical: "危險",
      tapToGuess: "點擊數字進行猜測",
      scroll: "滑動查看更多"
    },
    gameover: {
      boom: "爆炸!",
      hiddenNumberWas: "隱藏的數字是",
      forfeitRequired: "執行懲罰",
      deciphering: "正在生成懲罰...",
      playAgain: "再來一局",
      defaultPunishment: "跳一段滑稽的舞30秒！",
      errorPunishment: "給大家講個笑話！"
    }
  }
};