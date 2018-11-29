// игра
import AbstractScreen from './abstract-screen';
import {Game, gameTimer} from './util';
import {levels, initialLevel, albumImages} from './data';
import stats from './stats-template';

export default class GameScreen extends AbstractScreen {
  constructor(level, initial, callback, binding) {
    super();
    this.level = level;
    this.initial = initial;
    this.callback = callback;
    this.binding = binding;
  }
  get header() {
    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      <div class="game__timer">30</div>
      <div class="game__lives">
      ${Array.from({length: Game.LIVES - this.initial.lives})
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
      ${Array.from({length: this.initial.lives})
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
      </div>
    </header>`;
  }
  get template() {
    return `${this.header}<section class="game">
    <p class="game__task">${this.level.task}</p>
      <form class="game__content ${this.level.selector}">
        ${this.level.template}
      </form>
    </section>`;
  }
  bind() {
    this.binding(this);
  }
}
