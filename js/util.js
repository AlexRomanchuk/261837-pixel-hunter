// утилиты
export const Game = {
  LEVEL: 1,
  LIVES: 3,
  TIME: 30,
  COUNT_QUESTIONS: 10,
  IDEAL_STEP: 100,
  BONUS_STEP: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20,
  MIN_ANSWERS: 7
};
// функция пример для тестирования
export const removeLives = (lives, answer) => {
  const timeoutAnswer = answer.time > Game.TIME;
  let gamerLives = lives;
  if (timeoutAnswer) {
    gamerLives -= 1;
  }
  return gamerLives;
};

export const addStats = (screen, DOM) => {
  const section = screen.querySelector(`.game`);
  section.appendChild(DOM);
};

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
  let gameLives = lives;
  if (lives < 0) {
    gameLives = 0;
  }
  const liveScore = gameLives * Game.BONUS_STEP;
  if (answers.length < Game.MIN_ANSWERS) {
    score = -1;
  } else {
    answers.forEach((answer) => {
      if (answer.right && answer.time < Game.FAST_ANSWER_TIME) {
        score = score + Game.IDEAL_STEP + Game.BONUS_STEP;
      } else if (answer.right && answer.time > Game.SLOW_ANSWER_TIME) {
        score = score + Game.IDEAL_STEP - Game.BONUS_STEP;
      } else if (answer.right) {
        score += Game.IDEAL_STEP;
      }
    });
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
  answers.forEach((answer) => {
    if (answer.right) {
      score += Game.IDEAL_STEP;
      if (answer.time < Game.FAST_ANSWER_TIME) {
        countBonuses += 1;
      }
      if (answer.time > Game.SLOW_ANSWER_TIME) {
        countFines += 1;
      }
    } else if (!answer.right || !answer) {
      gameLives -= 1;
    }
  });
  if (gameLives < 0) {
    score = `fail`;
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
// функция пример для тестирования
export const changeLevels = (level, answers, callbackGame, callbackScore) => {
  const curLevel = level;
  const result = {
    lives: callbackGame(answers),
    level: curLevel + 1,
    score: callbackScore(answers, callbackGame(answers))
  };
  return result;
};

export const showScreen = (elem) => {
  if (elem) {
    const mainElement = document.querySelector(`#main`);
    mainElement.innerHTML = ``;
    mainElement.appendChild(elem);
  }
};

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};
