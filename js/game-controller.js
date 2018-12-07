// контроллер приложения
import {resultData} from './data';
import {Game, showScreen, addStats} from './util';
import stats from './stats-template';
import GameScreen from './game-screen';
import Application from './application';
import Results from './results';
const FAIL = false;
const WIN = true;
const ONE_SECOND = 1000;
const timeouts = [];
const clearTimeouts = (arrTimeouts) => {
  for (let timeout of arrTimeouts) {
    clearTimeout(timeout);
  }
};
const backToStart = (domElement) => {
  const buttonExit = domElement.querySelector(`.back`);
  buttonExit.addEventListener(`click`, () => {
    clearTimeouts(timeouts);
    Application.showGreeting();
  });
};
const exit = (win) => {
  if (!win) {
    resultData.gameResults.push(resultData.answers);
  }
  const pageResults = new Results(resultData.gameResults);
  pageResults.onExit = backToStart(pageResults.domElement);
  Application.showStats(resultData.gameResults);
};
const bindGameOne = (context) => {
  const radioButtonsOne = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  const radioButtonsTwo = context.domElement.querySelectorAll(`.visually-hidden[name="question2"]`);
  addStats(context.domElement, stats(resultData.answers));
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
const bindGameTwo = (context) => {
  const answersButtons = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  addStats(context.domElement, stats(resultData.answers));
  answersButtons.forEach((btn) => {
    btn.addEventListener(`input`, () => {
      context.onAnswer = context.callback(answersButtons);
    });
  });
  backToStart(context.domElement);
};
const bindGameThree = (context) => {
  const imagesAnswers = context.domElement.querySelectorAll(`.game__option img`);
  addStats(context.domElement, stats(resultData.answers));
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      context.onAnswer = context.callback(img.src);
    });
  });
  backToStart(context.domElement);
};

export default class GameController {
  constructor(model) {
    this.model = model;
    this._timer = null;
  }
  _startTimer() {
    this.model.tick();
    this._timer = setTimeout(() => this._startTimer(), ONE_SECOND);
    timeouts.push(this._timer);
    if (this.model.isTimeout()) {
      resultData.answers.push(null);
      this.model.die();
      this._stopTimer();
      this.start();
    }
  }
  _stopTimer() {
    clearTimeout(this._timer);
  }
  start() {
    const level = this.model.getCurrentLevel();
    const onAnswerOne = (buttonsImageLeft, buttonsImageRight) => {
      let resultOne = false;
      let resultTwo = false;
      buttonsImageLeft.forEach((btn) => {
        if (btn.checked) {
          resultOne = btn.value;
        }
      });
      buttonsImageRight.forEach((btn) => {
        if (btn.checked) {
          resultTwo = btn.value;
        }
      });
      if (resultOne && resultTwo) {
        const answer = `${resultOne},${resultTwo}`;
        const result = answer === level.answer;
        this.model.onAnswer(result);
        this._stopTimer();
        this.start();
      }
    };
    const onAnswerTwo = (buttons) => {
      let result = false;
      buttons.forEach((btn) => {
        if (btn.checked) {
          result = btn.value === level.answer;
          this.model.onAnswer(result);
          this._stopTimer();
          this.start();
        }
      });
    };
    const onAnswerThree = (answer) => {
      const result = answer === level.answer;
      this.model.onAnswer(result);
      this._stopTimer();
      this.start();
    };
    let binding;
    let onAnswer;
    switch (this.model.initial.level) {
      case 1:
        binding = bindGameOne;
        onAnswer = onAnswerOne;
        break;
      case 2:
        binding = bindGameTwo;
        onAnswer = onAnswerTwo;
        break;
      case 3:
        binding = bindGameThree;
        onAnswer = onAnswerThree;
        break;
    }
    if (!this.model.isEndOfGame()) {
      this.model.restartTime();
      showScreen(new GameScreen(this.model.getCurrentLevel(), this.model.initial, onAnswer, binding).domElement);
      this._startTimer();
      if (this.model.isDead()) {
        this._stopTimer();
        exit(FAIL);
        this.model.restart();
      }
      if (resultData.answers.length === Game.COUNT_QUESTIONS) {
        this._stopTimer();
        this.model.reload();
        this.model.nextLevel();
        this.start();
      }
    } else {
      exit(WIN);
      this.model.restart();
    }
  }
}
