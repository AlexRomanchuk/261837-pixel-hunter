// утилиты
export const Game = {
  LEVEL: 0,
  LIVES: 3,
  TIME: 31,
  COUNT_QUESTIONS: 10,
  IDEAL_STEP: 100,
  BONUS_STEP: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20,
  WARNING_TIME: 5,
  MIN_ANSWERS: 7
};

export const debug = true;

export const addStats = (screen, DOM) => {
  const section = screen.querySelector(`.game`);
  section.appendChild(DOM);
};
// функция пример для тестирования
export const gameTimer = (time, callback) => {
  let lastTime = time;
  gameTimer.timerInterval = setInterval(() => {
    callback(lastTime - 1);
    lastTime--;
    if (lastTime === 0) {
      gameTimer.pause();
      callback(`Time Out!`);
    }
  }, 1000);
  return true;
};

gameTimer.pause = () => {
  clearInterval(gameTimer.timerInterval);
};

gameTimer.start = (time, callback) => {
  const result = gameTimer(time, callback);
  return result;
};
// функция пример для тестирования
export const countScore = (answers, lives) => {
  let score = 0;
  const gameLives = lives < 0 ? 0 : lives;
  const liveScore = gameLives * Game.BONUS_STEP;
  if (answers.length < Game.MIN_ANSWERS) {
    score = -1;
  } else {
    for (let answer of answers) {
      if (answer.right && answer.time < Game.FAST_ANSWER_TIME) {
        score = score + Game.IDEAL_STEP + Game.BONUS_STEP;
      } else if (answer.right && answer.time > Game.SLOW_ANSWER_TIME) {
        score = score + Game.IDEAL_STEP - Game.BONUS_STEP;
      } else if (answer.right) {
        score += Game.IDEAL_STEP;
      }
    }
    score += liveScore;
  }
  return score;
};
// Функция подсчета очков по ответам
export const countTotal = (answers) => {
  let score = 0;
  let countBonuses = 0;
  let countFines = 0;
  let gameLives = Game.LIVES;
  for (let answer of answers) {
    if (answer && answer.right) {
      score += Game.IDEAL_STEP;
      if (answer.time < Game.FAST_ANSWER_TIME) {
        countBonuses += 1;
      }
      if (answer.time > Game.SLOW_ANSWER_TIME) {
        countFines += 1;
      }
    } else if (!answer || !answer.right) {
      gameLives -= 1;
    }
  }
  if (gameLives < 0) {
    score = 0;
    countBonuses = 0;
    countFines = 0;
  }
  return {
    'bonus': Game.BONUS_STEP,
    'step': Game.IDEAL_STEP,
    'countFines': countFines,
    'countBonuses': countBonuses,
    'score': score,
    'lives': gameLives < 0 ? 0 : gameLives
  };
};

export const showScreen = (elem) => {
  if (elem) {
    const mainElement = document.querySelector(`#main`);
    mainElement.innerHTML = ``;
    mainElement.appendChild(elem);
  }
};

export const showConfirm = (callback) => {
  const body = document.querySelector(`body`);
  const modalTemplate = `<section class="modal" style="position: absolute;">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn modal__btn--ok">Ок</button>
        <button class="modal__btn modal__btn--cancel">Отмена</button>
      </div>
    </form>
  </section>`;
  const domElement = getElementFromTemplate(modalTemplate);
  const closeModal = (evt) => {
    evt.preventDefault();
    body.removeChild(domElement);
  };
  const addClickHandler = (domElem) => {
    domElem.addEventListener(`click`, (evt) => {
      closeModal(evt);
    });
  };
  const ok = domElement.querySelector(`.modal__btn--ok`);
  const buttonClose = domElement.querySelector(`.modal__close`);
  const cancel = domElement.querySelector(`.modal__btn--cancel`);
  ok.addEventListener(`click`, (evt) => {
    closeModal(evt);
    callback();
  });
  addClickHandler(cancel);
  addClickHandler(buttonClose);
  body.appendChild(domElement);
};

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};
