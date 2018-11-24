// шаблон 2 уровня
import {Game, getElementFromTemplate, addStats, showScreen} from '../js/util.js';
import {initialLevel} from '../js/data.js';
import {openLevel} from '../js/game.js';
import header from '../js/game-header.js';
import stats from '../js/stats-template.js';
const level2Initial = Object.assign({}, initialLevel, {
  'answers': [],
  'lives': initialLevel.lives
});
let answers = 0;
export default (initial, data, photos) => {
  const content = `${header(level2Initial)}<section class="game">
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
  addStats(gameTwoScreen, stats(level2Initial.answers));

  const answersButtons = gameTwoScreen.querySelectorAll(`.visually-hidden[name="question1"]`);

  const checkAnswer = (buttons) => {
    let result = false;
    buttons.forEach((btn) => {
      if (btn.checked) {
        result = btn.value === data.answer;
        if (!result) {
          level2Initial.lives = level2Initial.lives - 1;
        }
        level2Initial.answers.push({
          right: result,
          time: 15
        });
        answers++;
        showScreen(openLevel(initial));
      }
      if (answers === Game.COUNT_QUESTIONS) {
        initial.level += 1;
        setTimeout(() => {
          showScreen(openLevel(initial));
        }, 1500);
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
