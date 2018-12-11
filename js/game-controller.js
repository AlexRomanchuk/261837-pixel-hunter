// контроллер приложения
import {resultData} from './data';
import {showScreen, addStats, debug} from './util';
import StatsTemplate from './stats-template';
import GameScreen from './game-screen';
import Application from './application';
import StatsLoader from './stats-loader';
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
    Application.showGreeting(window.gameData);
  });
};
const exit = () => {
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
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  radioButtonsOne.forEach((btn) => {
    btn.addEventListener(`click`, () => {
      context.onAnswer = context.callback(radioButtonsOne, radioButtonsTwo);
    });
  });
  radioButtonsTwo.forEach((btn) => {
    btn.addEventListener(`click`, () => {
      context.onAnswer = context.callback(radioButtonsOne, radioButtonsTwo);
    });
  });
  backToStart(context.domElement);
};
const bindGameTwo = (context) => {
  const answersButtons = context.domElement.querySelectorAll(`.visually-hidden[name="question1"]`);
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  answersButtons.forEach((btn) => {
    btn.addEventListener(`click`, () => {
      context.onAnswer = context.callback(answersButtons);
    });
  });
  backToStart(context.domElement);
};
const bindGameThree = (context) => {
  const imagesAnswers = context.domElement.querySelectorAll(`.game__option img`);
  addStats(context.domElement, new StatsTemplate(resultData.answers).render());
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      context.onAnswer = context.callback(img);
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
  start() {
    const onAnswerOne = (buttonsImageLeft, buttonsImageRight) => {
      const answers = [window.gameData[this.model.initial.question].answers[0].type, window.gameData[this.model.initial.question].answers[1].type];
      let resultOne = false;
      let resultTwo = false;
      let answerLeftChecked = false;
      let answerRightChecked = false;
      buttonsImageLeft.forEach((btn) => {
        if (btn.checked) {
          answerLeftChecked = true;
          resultOne = btn.value === answers[0];
        }
      });
      buttonsImageRight.forEach((btn) => {
        if (btn.checked) {
          answerRightChecked = true;
          resultTwo = btn.value === answers[1];
        }
      });
      if (answerLeftChecked && answerRightChecked) {
        const result = resultOne && resultTwo;
        this.model.onAnswer(result);
        this._stopTimer();
        this.start();
      }
    };
    const onAnswerTwo = (buttons) => {
      let result = false;
      buttons.forEach((btn) => {
        if (btn.checked) {
          result = btn.value === window.gameData[this.model.initial.question].answers[0].type;
          this.model.onAnswer(result);
          this._stopTimer();
          this.start();
        }
      });
    };
    const onAnswerThree = (img) => {
      let answer = `photo`;
      if (window.gameData[this.model.initial.question].question === `Найдите рисунок среди изображений`) {
        answer = `painting`;
      }
      const result = img.alt === answer;
      this.model.onAnswer(result);
      this._stopTimer();
      this.start();
    };
    if (!this.model.isEndOfGame()) {
      let selector;
      let template;
      let binding;
      let onAnswer;
      switch (window.gameData[this.model.initial.question].type) {
        case `two-of-two`:
          selector = ``;
          template = `<div class="game__option">
          <img src="${window.gameData[this.model.initial.question].answers[0].image.url}"
            title="${debug ? window.gameData[this.model.initial.question].answers[0].type : ``}" alt="Option 1"
            width="${window.gameData[this.model.initial.question].answers[0].image.width}"
            height="${window.gameData[this.model.initial.question].answers[0].image.height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${window.gameData[this.model.initial.question].answers[1].image.url}"
            title="${debug ? window.gameData[this.model.initial.question].answers[1].type : ``}" alt="Option 2"
            width="${window.gameData[this.model.initial.question].answers[1].image.width}"
            height="${window.gameData[this.model.initial.question].answers[1].image.height}">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>`;
          binding = bindGameOne;
          onAnswer = onAnswerOne;
          break;
        case `tinder-like`:
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
        case `one-of-three`:
          selector = `game__content--triple`;
          template = `<div class="game__option">
          <img src="${window.gameData[this.model.initial.question].answers[0].image.url}"
          title="${debug ? window.gameData[this.model.initial.question].answers[0].type : ``}"
          alt="${window.gameData[this.model.initial.question].answers[0].type}"
          width="${window.gameData[this.model.initial.question].answers[0].image.width}"
          height="${window.gameData[this.model.initial.question].answers[0].image.height}">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${window.gameData[this.model.initial.question].answers[1].image.url}"
          title="${debug ? window.gameData[this.model.initial.question].answers[1].type : ``}"
          alt="${window.gameData[this.model.initial.question].answers[1].type}"
          width="${window.gameData[this.model.initial.question].answers[1].image.width}"
          height="${window.gameData[this.model.initial.question].answers[1].image.height}">
        </div>
        <div class="game__option">
           <img src="${window.gameData[this.model.initial.question].answers[2].image.url}"
           title="${debug ? window.gameData[this.model.initial.question].answers[2].type : ``}"
           alt="${window.gameData[this.model.initial.question].answers[2].type}"
           width="${window.gameData[this.model.initial.question].answers[2].image.width}"
           height="${window.gameData[this.model.initial.question].answers[2].image.height}">
        </div>`;
          binding = bindGameThree;
          onAnswer = onAnswerThree;
          break;
      }
      this.model.restartTime();
      showScreen(new GameScreen(selector, template, window.gameData[this.model.initial.question], this.model.initial, onAnswer, binding).domElement);
      this._startTimer();
      if (this.model.isDead()) {
        this._exit();
      }
    } else {
      this._exit();
    }
  }
}
