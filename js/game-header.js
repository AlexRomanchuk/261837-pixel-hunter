// шаблон хедера
import {Game, getElementFromTemplate, backToStart} from '../js/util.js';
import greetingScreen from '../js/greeting.js';
export default (initial = null) => {
  const content = `<header class="header">
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

  const DOMContent = getElementFromTemplate(content);
  if (initial && initial.itIsGame) {
    const header = DOMContent.querySelector(`.header`);
    const DOMTimer = getElementFromTemplate(`<div class="game__timer">30</div>`);
    const DOMLives = getElementFromTemplate(`<div class="game__lives">
      ${new Array(Game.LIVES - initial.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
      ${new Array(initial.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
    </div>`);
    header.appendChild(DOMTimer);
    header.appendChild(DOMLives);
    backToStart(DOMContent, greetingScreen, initial);
  } else if (initial) {
    backToStart(DOMContent, greetingScreen, initial);
  }
  backToStart(DOMContent, greetingScreen);
  return DOMContent;
};
