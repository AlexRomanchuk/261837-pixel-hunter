// данные
import {Game} from './util';
export const initialLevel = {
  question: Game.LEVEL,
  time: Game.TIME,
  lives: Game.LIVES
};
export const resultData = {
  answers: []
};
export const gameTimers = {
  answerTime: 0,
  gameTime: Game.TIME
};
