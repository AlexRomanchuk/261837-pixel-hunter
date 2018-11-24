// игра 2
/* import {Game, showScreen} from '../js/util.js';
import {levels, initialLevel, albumImages} from '../js/data.js';
import levelStatsTemplate from '../js/stats-template.js';
import gameTemplate from '../js/game-template.js';
import game2Template from '../js/game2-template.js';
import header from '../js/game-header.js';
import gameThreeScreen from '../js/game-3.js';

let answers = 0;

const task = levels.game2;

const gameTwoScreen = game2Template(initialLevel, task, albumImages);
const answersForm = gameTwoScreen.querySelector(`.game__content`);

const answersButtons = gameTwoScreen.querySelectorAll(`.visually-hidden[name="question1"]`);

const checkAnswer = (buttons) => {
  let result = false;
  buttons.forEach((btn) => {
    if (btn.checked) {
      result = btn.value === task.answer;
      if (!result) {
        initialLevel.lives = initialLevel.lives - 1;
      }
      initialLevel.answers.push({
        right: result,
        time: 15
      });
      answersForm.reset();
      console.log(initialLevel.lives, initialLevel.answers);
    }
  });

  answers++;

  if (answers === Game.COUNT_QUESTIONS) {
    showScreen(gameThreeScreen);
  }
};

answersButtons.forEach((btn) => {
  btn.addEventListener(`input`, () => {
    checkAnswer(answersButtons);
  });
});

export default gameTwoScreen;
 */
