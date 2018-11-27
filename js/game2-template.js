// шаблон 2 уровня
import {Game, getElementFromTemplate, addStats, showScreen, exit, showNextLevel} from './util';
import header from './game-header';
import {openScreen} from './game';
import stats from './stats-template';
import renderResults from './templater';
import resultsTemplate from './results-template';
export default (initial, data, photos) => {
  const content = `<section class="game">
    <p class="game__task">${data.task}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${photos.paintings[2]}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </section>`;
  const gameTwoScreen = getElementFromTemplate(content);
  addStats(gameTwoScreen, stats(initial.answers));

  const answersButtons = gameTwoScreen.querySelectorAll(`.visually-hidden[name="question1"]`);

  const checkAnswer = (buttons) => {
    let result = false;
    buttons.forEach((btn) => {
      if (btn.checked) {
        result = btn.value === data.answer;
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
    });
  };

  answersButtons.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      checkAnswer(answersButtons);
    });
  });
  return gameTwoScreen;
};
