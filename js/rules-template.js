// правила

import {getElementFromTemplate, showScreen} from '../js/util.js';
import {initialLevel} from '../js/data.js';
import {openScreen} from '../js/game.js';
export default () => {
  const rulesScreen = getElementFromTemplate(`<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" required>
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`);

  const rulesForm = rulesScreen.querySelector(`.rules__form`);
  const rulesField = rulesScreen.querySelector(`.rules__input`);
  const buttonContinue = rulesScreen.querySelector(`.rules__button`);

  rulesField.addEventListener(`input`, () => {
    if (rulesField.value.trim()) {
      buttonContinue.disabled = ``;
    } else {
      buttonContinue.disabled = `disabled`;
    }
  });

  rulesForm.addEventListener(`submit`, () => {
    initialLevel.itIsGame = true;
    showScreen(openScreen(initialLevel));
  });
  return rulesScreen;
};
