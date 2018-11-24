// шаблон 1 уровня
import {Game, getElementFromTemplate, addStats, showScreen} from '../js/util.js';
import {openLevel} from '../js/game.js';
import {initialLevel} from '../js/data.js';
import header from '../js/game-header.js';
import stats from '../js/stats-template.js';
const level1Initial = Object.assign({}, initialLevel, {
  'answers': [],
  'lives': initialLevel.lives
});
let answers = 0;
export default (initial, data, photos) => {
  const content = `${header(level1Initial)}<section class="game">
    <p class="game__task">${data.task}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${photos.paintings[1]}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${photos.photos[1]}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </section>`;
  const gameOneScreen = getElementFromTemplate(content);
  const radioButtonsOne = gameOneScreen.querySelectorAll(`.visually-hidden[name="question1"]`);
  const radioButtonsTwo = gameOneScreen.querySelectorAll(`.visually-hidden[name="question2"]`);
  addStats(gameOneScreen, stats(level1Initial.answers));

  const checkAnswers = (buttons1, buttons2) => {
    let result1 = false;
    let result2 = false;
    buttons1.forEach((btn) => {
      if (btn.checked) {
        result1 = btn.value;
      }
    });

    buttons2.forEach((btn) => {
      if (btn.checked) {
        result2 = btn.value;
      }
    });

    if (result1 && result2) {
      const answer = `${result1},${result2}`;
      const result = answer === data.answer;
      if (!result) {
        level1Initial.lives = level1Initial.lives - 1;
      }
      level1Initial.answers.push({
        right: result,
        time: 15
      });
      answers++;
      showScreen(openLevel(level1Initial));
    }
    if (answers === Game.COUNT_QUESTIONS) {
      initial.level += 1;
      setTimeout(() => {
        showScreen(openLevel(initial));
      }, 1500);
    }
  };
  radioButtonsOne.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      checkAnswers(radioButtonsOne, radioButtonsTwo);
    });
  });
  radioButtonsTwo.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      checkAnswers(radioButtonsOne, radioButtonsTwo);
    });
  });
  return gameOneScreen;
};
