// контроллер приложения
import {resultData} from './data';
import {showScreen, addStats, showConfirm, debug} from './util';
import StatsTemplate from './stats-template';
import GameScreen from './game-screen';
import Application from './application';
import StatsLoader from './stats-loader';
const ONE_SECOND = 1000;
const GameTypes = {
  ONE_IMAGE: `tinder-like`,
  TWO_IMAGES: `two-of-two`,
  THREE_IMAGES: `one-of-three`
};
const QUESTION_TRIPPLE = `Найдите рисунок среди изображений`;
const timeouts = [];
const clearTimeouts = (arrTimeouts) => {
  for (let timeout of arrTimeouts) {
    clearTimeout(timeout);
  }
};
const addBackHandler = (domElement) => {
  const buttonExit = domElement.querySelector(`.back`);
  buttonExit.addEventListener(`click`, () => {
    showConfirm(() => {
      clearTimeouts(timeouts);
      Application.showGreeting(window.gameData);
    });
  });
};
const exit = () => {
  clearTimeouts(timeouts);
  StatsLoader.saveStats(resultData.answers, window.userName)
    .then(() => StatsLoader.loadStats(window.userName))
    .then((data) => {
      data = Array.from(data);
      Application.showStats(data);
    })
    .catch((err) => Application.showError(err.message));
};
const bindGameOne = (context) => {
  const radioButtonsOne = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  const radioButtonsTwo = context.domElement.querySelectorAll(`.visually-hidden[name="question2"]`);
  const addAnswerHandler = (buttons) => {
    buttons.forEach((btn) => {
      btn.addEventListener(`click`, () => {
        context.onAnswer = context.callback(radioButtonsOne, radioButtonsTwo);
      });
    });
  };
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  addAnswerHandler(radioButtonsOne);
  addAnswerHandler(radioButtonsTwo);
  addBackHandler(context.domElement);
};
const bindGameTwo = (context) => {
  const answersButtons = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  answersButtons.forEach((btn) => {
    btn.addEventListener(`click`, () => {
      context.onAnswer = context.callback(answersButtons);
    });
  });
  addBackHandler(context.domElement);
};
const bindGameThree = (context) => {
  const imagesAnswers = context.domElement.querySelectorAll(`.game__option img`);
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      context.onAnswer = context.callback(img);
    });
  });
  addBackHandler(context.domElement);
};
const findChecked = (buttons) => {
  for (const btn of buttons) {
    if (btn.checked) {
      return btn.value;
    }
  }
  return false;
};
export default class GameController {
  constructor(model) {
    this.model = model;
    this._timer = null;
  }
  _startTimer(callback) {
    this.model.tick(callback);
    this._timer = setTimeout(() => this._startTimer(callback), ONE_SECOND);
    timeouts.push(this._timer);
    if (this.model.isTimeout()) {
      resultData.answers.push(null);
      this.model.die();
      this.model.initial.question++;
      this._stopTimer();
      this.start();
    }
  }
  _stopTimer() {
    clearTimeout(this._timer);
  }
  _exit() {
    this._stopTimer();
    exit();
    this.model.restart();
  }
  _changeLevel(answer) {
    this.model.onAnswer(answer);
    this._stopTimer();
    this.start();
  }
  _createLevel() {
    const onAnswerOne = (buttonsImageLeft, buttonsImageRight) => {
      let resultOne = false;
      let resultTwo = false;
      const checkedLeftAnswer = findChecked(buttonsImageLeft);
      const checkedRightAnswer = findChecked(buttonsImageRight);
      if (checkedLeftAnswer && checkedRightAnswer) {
        resultOne = checkedLeftAnswer === window.gameData[this.model.initial.question].answers[0].type;
        resultTwo = checkedRightAnswer === window.gameData[this.model.initial.question].answers[1].type;
        const result = resultOne && resultTwo;
        this._changeLevel(result);
      }
    };
    const onAnswerTwo = (buttons) => {
      let result = false;
      const checkedAnswer = findChecked(buttons);
      if (checkedAnswer) {
        result = checkedAnswer === window.gameData[this.model.initial.question].answers[0].type;
        this._changeLevel(result);
      }
    };
    const onAnswerThree = (img) => {
      const answer = window.gameData[this.model.initial.question].question === QUESTION_TRIPPLE ? `painting` : `photo`;
      const result = img.alt === answer;
      this._changeLevel(result);
    };
    let selector;
    let template;
    let binding;
    let onAnswer;
    switch (window.gameData[this.model.initial.question].type) {
      case GameTypes.TWO_IMAGES:
        selector = ``;
        template = window.gameData[this.model.initial.question].answers.map((question, i) => `<div class="game__option">
            <img src="${question.image.url}"
              title="${debug ? question.type : ``}" alt="Option 1"
              width="${question.image.width}"
              height="${question.image.height}">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question${i + 1}" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>`).join(``);
        binding = bindGameOne;
        onAnswer = onAnswerOne;
        break;
      case GameTypes.ONE_IMAGE:
        selector = `game__content--wide`;
        template = `<div class="game__option">
            <img src="${window.gameData[this.model.initial.question].answers[0].image.url}"
              title="${debug ? window.gameData[this.model.initial.question].answers[0].type : ``}" alt="Option 1"
              width="${window.gameData[this.model.initial.question].answers[0].image.width}"
              height="${window.gameData[this.model.initial.question].answers[0].image.height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>`;
        binding = bindGameTwo;
        onAnswer = onAnswerTwo;
        break;
      case GameTypes.THREE_IMAGES:
        selector = `game__content--triple`;
        template = window.gameData[this.model.initial.question].answers.map((question) => `<div class="game__option">
            <img src="${question.image.url}"
              title="${debug ? question.type : ``}"
              alt="${question.type}"
              width="${question.image.width}"
              height="${question.image.height}">
          </div>`).join(``);
        binding = bindGameThree;
        onAnswer = onAnswerThree;
        break;
    }
    return {
      'selector': selector,
      'template': template,
      'binding': binding,
      'onAnswer': onAnswer
    };
  }
  start() {
    if (!this.model.isEndOfGame()) {
      const level = this._createLevel();
      this.model.restartTime();
      const gameScreen = new GameScreen(level.selector, level.template, window.gameData[this.model.initial.question].question, this.model, level.onAnswer, level.binding);
      showScreen(gameScreen.domElement);
      this._startTimer(gameScreen.onTick);
      if (this.model.isDead()) {
        this._exit();
      }
    } else {
      this._exit();
    }
  }
}
