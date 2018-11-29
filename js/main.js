// центр приложения
import {initialLevel, levels} from './data';
import {Game, showScreen, addStats} from './util';
import stats from './stats-template';
import Intro from './intro';
import Greeting from './greeting';
import Rules from './rules';
import GameScreen from './game-screen';
import Results from './results';
export const greeting = new Greeting();
const intro = new Intro();
const rules = new Rules(levels, initialLevel);
const exit = () => {
  initialLevel.results.push(initialLevel.answers);
  showScreen(new Results(initialLevel.results).domElement);
};
const bindGameOne = (context) => {
  const radioButtonsOne = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  const radioButtonsTwo = context.domElement.querySelectorAll(`.visually-hidden[name="question2"]`);
  addStats(context.domElement, stats(initialLevel.answers));
  radioButtonsOne.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      context.onAnswer = context.callback(radioButtonsOne, radioButtonsTwo);
    });
  });
  radioButtonsTwo.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      context.onAnswer = context.callback(radioButtonsOne, radioButtonsTwo);
    });
  });
};
const onAnswerOne = (buttons1, buttons2) => {
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
    const result = answer === levels.game1.answer;
    if (!result) {
      initialLevel.lives = initialLevel.lives - 1;
    }
    initialLevel.answers.push({
      right: result,
      time: 15
    });
    if (initialLevel.lives < 0) {
      exit();
    } else {
      showScreen(new GameScreen(levels.game1, initialLevel, onAnswerOne, bindGameOne).domElement);
    }
  }
  if (initialLevel.answers.length === Game.COUNT_QUESTIONS) {
    setTimeout(() => {
      initialLevel.results.push(initialLevel.answers);
      initialLevel.answers = [];
      showScreen(new GameScreen(levels.game2, initialLevel, onAnswerTwo, bindGameTwo).domElement);
    }, 200);
  }
};
const gameOne = new GameScreen(levels.game1, initialLevel, onAnswerOne, bindGameOne);
const bindGameTwo = (context) => {
  const answersButtons = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  addStats(context.domElement, stats(initialLevel.answers));
  answersButtons.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      context.onAnswer = context.callback(answersButtons);
    });
  });
};
const onAnswerTwo = (buttons) => {
  let result = false;
  buttons.forEach((btn) => {
    if (btn.checked) {
      result = btn.value === levels.game2.answer;
      if (!result) {
        initialLevel.lives = initialLevel.lives - 1;
      }
      initialLevel.answers.push({
        right: result,
        time: 15
      });
      if (initialLevel.lives < 0) {
        exit();
      } else {
        initialLevel.results.push(initialLevel.answers);
        initialLevel.answers = [];
        showScreen(new GameScreen(levels.game2, initialLevel, onAnswerTwo, bindGameTwo).domElement);
      }
    }
    if (initialLevel.answers.length === Game.COUNT_QUESTIONS) {
      setTimeout(() => {
        showScreen(new GameScreen(levels.game3, initialLevel, onAnswerThree, bindGameThree).domElement);
      }, 200);
    }
  });
};
const bindGameThree = (context) => {
  const imagesAnswers = context.domElement.querySelectorAll(`.game__option img`);
  addStats(context.domElement, stats(initialLevel.answers));
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      context.onAnswer = context.callback(img.src);
    });
  });
};
const onAnswerThree = (answer) => {
  const result = answer === levels.game3.answer;
  if (!result) {
    initialLevel.lives = initialLevel.lives - 1;
  }
  initialLevel.answers.push({
    right: result,
    time: initialLevel.time
  });
  if (initialLevel.lives < 0) {
    exit();
  } else {
    showScreen(new GameScreen(levels.game3, initialLevel, onAnswerThree, bindGameThree).domElement);
  }
  if (initialLevel.answers.length === Game.COUNT_QUESTIONS) {
    setTimeout(() => {
      exit();
    }, 200);
  }
};
greeting.onClick = () => {
  showScreen(rules.domElement);
};
intro.onClick = () => {
  showScreen(greeting.domElement);
};
rules.onAnswer = () => {
  showScreen(gameOne.domElement);
};
showScreen(intro.domElement);

