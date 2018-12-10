// правила
import AbstractScreen from './abstract-screen';
import Application from './application';
let i = 0;
window.userName = ``;
export default class Rules extends AbstractScreen {
  constructor() {
    super();
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
      <li>Три вида вопросов:</li>
      <li>Найти рисунок или фото среди трех изображений</li>
      <li>Определить, чем является изображение - фотографией или рисунком</li>
      <li>Угадать, фото или рисунок, для двух изображений</li>
      <li>Список вопросов:</li>
      <li class="rule">На каждую попытку отводится 30 секунд.</li>
      <li>За таймаут минус одна попытка.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form" action="index.html">
      <input class="rules__input" type="text" placeholder="Ваше Имя" required>
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
    </section>`;
  }
  bind() {
    const rule = this.domElement.querySelector(`.rule`);
    const rulesList = this.domElement.querySelector(`.rules__description`);
    const rulesField = this.domElement.querySelector(`.rules__input`);
    const buttonContinue = this.domElement.querySelector(`.rules__button`);
    const buttonExit = this.domElement.querySelector(`.back`);
    for (let riddle of window.gameData) {
      i++;
      const riddleTitle = document.createElement(`li`);
      riddleTitle.textContent = `${i}: ${riddle.question}`;
      rulesList.insertBefore(riddleTitle, rule);
    }
    rulesField.addEventListener(`input`, () => {
      if (rulesField.value.trim()) {
        buttonContinue.disabled = ``;
      } else {
        buttonContinue.disabled = `disabled`;
      }
    });
    buttonContinue.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.userName = rulesField.value.trim();
      Application.showGame(window.gameData);
    });
    buttonExit.addEventListener(`click`, () => {
      Application.showGreeting(window.gameData);
    });
  }
}
