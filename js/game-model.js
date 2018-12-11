// модель приложения
import {initialLevel, resultData, gameTimers} from './data';

const tick = (timers) => {
  const clock = document.querySelector(`.game__timer`);
  timers.gameTime = timers.gameTime - 1;
  timers.answerTime = timers.answerTime + 1;
  if (clock) {
    clock.textContent = timers.gameTime;
    if (timers.gameTime <= 5) {
      clock.style = `color: red;`;
    }
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
  get getInitial() {
    return this.initial;
  }
  get getTimers() {
    return this.timers;
  }
  tick() {
    return tick(this.timers);
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
