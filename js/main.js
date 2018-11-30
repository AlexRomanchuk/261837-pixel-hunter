// центр приложения
import {initialLevel, levels} from './data';
import {Game, showScreen, addStats} from './util';
import stats from './stats-template';
import Intro from './intro';
import Greeting from './greeting';
import Rules from './rules';
import GameScreen from './game-screen';
import Results from './results';
const greeting = new Greeting();
const intro = new Intro();
const rules = new Rules(levels);
const backToStart = (dom) => {
  const buttonExit = dom.querySelector(`.back`);
  buttonExit.addEventListener(`click`, () => {
    initialLevel.results = [];
    initialLevel.answers = [];
    initialLevel.lives = Game.LIVES;
    initialLevel.time = 0;
    showScreen(greeting.domElement);
  });
};
const showNextLevel = (data, initial, callback, binding) => {
  initial.results.push(initial.answers);
  initial.answers = [];
  initial.lives = Game.LIVES;
  showScreen(new GameScreen(data, initial, callback, binding).domElement);
};
const exit = () => {
  initialLevel.results.push(initialLevel.answers);
  const results = new Results(initialLevel.results);
  results.onExit = backToStart(results.domElement);
  showScreen(results.domElement);
};
rules.onExit = backToStart(rules.domElement);
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
  backToStart(context.domElement);
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
      showNextLevel(levels.game2, initialLevel, onAnswerTwo, bindGameTwo);
    }, 200);
  }
};
const bindGameTwo = (context) => {
  const answersButtons = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  addStats(context.domElement, stats(initialLevel.answers));
  answersButtons.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      context.onAnswer = context.callback(answersButtons);
    });
  });
  backToStart(context.domElement);
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
        showScreen(new GameScreen(levels.game2, initialLevel, onAnswerTwo, bindGameTwo).domElement);
      }
    }
    if (initialLevel.answers.length === Game.COUNT_QUESTIONS) {
      setTimeout(() => {
        showNextLevel(levels.game3, initialLevel, onAnswerThree, bindGameThree);
      }, 150);
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
  backToStart(context.domElement);
};
const onAnswerThree = (answer) => {
  const result = answer === levels.game3.answer;
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
    showScreen(new GameScreen(levels.game3, initialLevel, onAnswerThree, bindGameThree).domElement);
  }
  if (initialLevel.answers.length === Game.COUNT_QUESTIONS) {
    setTimeout(() => {
      exit();
    }, 150);
  }
};
greeting.onClick = () => {
  showScreen(rules.domElement);
};
intro.onClick = () => {
  showScreen(greeting.domElement);
};
rules.onAnswer = () => {
  showScreen(new GameScreen(levels.game1, initialLevel, onAnswerOne, bindGameOne).domElement);
};
showScreen(intro.domElement);
