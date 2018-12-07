// общий класс экрана
import {initialLevel, levels, resultData, gameTimers} from './data';
import {Game} from './util';

const getLevel = (state) => levels[`game${state.level}`];
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
  constructor() {
    this.restart();
  }
  get getInitial() {
    return this.initial;
  }
  get getTimers() {
    return this.timers;
  }
  getCurrentLevel() {
    return getLevel(this.initial);
  }
  nextLevel() {
    resultData.gameResults.push(resultData.answers);
    resultData.answers = [];
    this.initial.level += 1;
  }
  tick() {
    return tick(this.timers);
  }
  die() {
    this.initial = die(this.initial);
  }
  reload() {
    this.initial.lives = Game.LIVES;
    this.timers = Object.assign({}, gameTimers);
  }
  restartTime() {
    this.timers = Object.assign({}, gameTimers);
  }
  restart() {
    this.initial = Object.assign({}, initialLevel);
    this.timers = Object.assign({}, gameTimers);
    resultData.answers = [];
    resultData.gameResults = [];
  }
  isDead() {
    return this.initial.lives < 0;
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
  }
  isEndOfGame() {
    return this.initial.level > Game.COUNT_LEVELS;
  }
}
