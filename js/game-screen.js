// игра
import AbstractScreen from './abstract-screen';
import {Game} from './util';

export default class GameScreen extends AbstractScreen {
  constructor(selector, template, data, initial, callback, binding) {
    super();
    this.gameTemplate = template;
    this.riddle = data;
    this.selector = selector;
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
    <p class="game__task">${this.riddle.question}</p>
      <form class="game__content ${this.selector}">
        ${this.gameTemplate}
      </form>
    </section>`;
  }
  bind() {
    this.binding(this);
  }
}
