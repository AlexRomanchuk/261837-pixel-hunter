// правила
import AbstractScreen from './abstract-screen';

export default class Rules extends AbstractScreen {
  constructor(data) {
    super();
    this.data = data;
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
    </header>`;
  }
  get template() {
    return `${this.header}<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      ${this.data.game1.rule}
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" required>
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
    </section>`;
  }
  bind() {
    const rulesForm = this.domElement.querySelector(`.rules__form`);
    const rulesField = this.domElement.querySelector(`.rules__input`);
    const buttonContinue = this.domElement.querySelector(`.rules__button`);

    rulesField.addEventListener(`input`, () => {
      if (rulesField.value.trim()) {
        buttonContinue.disabled = ``;
      } else {
        buttonContinue.disabled = `disabled`;
      }
    });

    rulesForm.addEventListener(`submit`, () => {
      this.onAnswer();
    });
    this.onExit();
  }
}
