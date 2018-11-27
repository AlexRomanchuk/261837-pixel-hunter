// правила
import {getElementFromTemplate, showScreen} from './util';
import {openScreen} from './game';
export default (initial, game) => {
  const rulesScreen = getElementFromTemplate(`<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      ${game.game1.rule}
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
    initial.itIsGame = true;
    showScreen(openScreen(initial));
  });
  return rulesScreen;
};
