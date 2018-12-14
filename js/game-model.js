// модель приложения
import {initialLevel, resultData, gameTimers} from './data';
const tick = (timers, callback) => {
  timers.gameTime = timers.gameTime - 1;
  timers.answerTime = timers.answerTime + 1;
  if (callback) {
    callback(timers.gameTime);
  }
};
const die = (initial) => {
  initial.lives -= 1;
  return initial;
};
export default class GameModel {
  constructor(data) {
    this.data = data;
    this.restart();
  }
  tick(callback) {
    return tick(this.timers, callback);
  }
  die() {
    this.initial = die(this.initial);
  }
  restartTime() {
    this.timers = Object.assign({}, gameTimers);
  }
  restart() {
    this.initial = Object.assign({}, initialLevel);
    this.timers = Object.assign({}, gameTimers);
    resultData.answers = [];
  }
  isDead() {
    return this.initial.lives < 0;
  }
  isEndOfGame() {
    return this.initial.question >= this.data.length;
  }
  isTimeout() {
    return this.timers.gameTime < 0;
  }
  onAnswer(result) {
    if (!result) {
      this.die();
    }
    resultData.answers.push({
      right: result,
      time: this.timers.answerTime
    });
    this.initial.question++;
  }
}
