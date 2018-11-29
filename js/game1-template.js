// шаблон 1 уровня
/* import {Game, getElementFromTemplate, addStats, showScreen, exit, showNextLevel} from './util';
import {openScreen} from './game';
import header from './game-header';
import stats from './stats-template';
import renderResults from './templater';
import resultsTemplate from './results-template';
export default (initial, data, photos) => {
  const content = `<section class="game">
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
  addStats(gameOneScreen, stats(initial.answers));

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
        initial.lives = initial.lives - 1;
      }
      initial.answers.push({
        right: result,
        time: initial.time
      });
      if (initial.lives < 0) {
        exit(initial, renderResults, header, resultsTemplate);
      } else {
        showScreen(openScreen(initial));
      }
    }
    if (initial.answers.length === Game.COUNT_QUESTIONS) {
      setTimeout(() => {
        showNextLevel(initial, openScreen);
      }, 200);
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
 */
