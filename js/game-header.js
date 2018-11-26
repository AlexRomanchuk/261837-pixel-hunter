// шаблон хедера
import {Game, getElementFromTemplate, backToStart, gameTimer} from '../js/util.js';
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

  const domContent = getElementFromTemplate(content);
  if (initial && initial.itIsGame) {
    const header = domContent.querySelector(`.header`);
    const domTimer = getElementFromTemplate(`<div class="game__timer">${Game.TIME}</div>`);
    const timer = domTimer.querySelector(`.game__timer`);
    const domLives = getElementFromTemplate(`<div class="game__lives">
      ${Array.from({length: Game.LIVES - initial.lives})
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
      ${Array.from({length: initial.lives})
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
    </div>`);
    header.appendChild(domTimer);
    header.appendChild(domLives);
    gameTimer.start(Game.TIME, (time) => {
      timer.textContent = time;
      initial.time += 1;
      if (time <= 10) {
        timer.style = `color: #dba400;`;
      }
      if (time <= 5) {
        timer.style = `color: red;`;
      }
    });
    backToStart(domContent, greetingScreen, initial);
  } else if (initial) {
    backToStart(domContent, greetingScreen, initial);
  }
  backToStart(domContent, greetingScreen);
  return domContent;
};
