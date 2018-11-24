// игра 1
/* import {Game, showScreen} from '../js/util.js';
import {levels, initialLevel, albumImages} from '../js/data.js';
import levelStatsTemplate from '../js/stats-template.js';
import gameTwoScreen from '../js/game-2.js';
import gameTemplate from '../js/game-template.js';
import game1Template from '../js/game1-template.js';
import header from '../js/game-header.js';

const task = levels.game1;
const finish = null;
let answers = 0;

const showNextLevel = (screen) => {
  initialLevel.lives = Game.LIVES;
  initialLevel.answers = [];
  showScreen(screen);
};

const gameOneScreen = game1Template(initialLevel, task, albumImages);
const answersForm = gameOneScreen.querySelector(`.game__content`);

const radioButtonsOne = gameOneScreen.querySelectorAll(`.visually-hidden[name="question1"]`);
const radioButtonsTwo = gameOneScreen.querySelectorAll(`.visually-hidden[name="question2"]`);

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
    const result = answer === task.answer;
    if (!result) {
      initialLevel.lives = initialLevel.lives - 1;
    }
    initialLevel.answers.push({
      right: result,
      time: 15
    });
    answers++;
    console.log(initialLevel.lives, initialLevel.answers);
    answersForm.reset();
    if (answers === Game.COUNT_QUESTIONS) {
      finish = initialLevel.answers;
      showNextLevel(gameTwoScreen);
    }
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

export default gameOneScreen;
 */

