// утилиты
export const Game = {
  LEVEL: 0,
  LIVES: 3,
  TIME: 30,
  COUNT_QUESTIONS: 10,
  IDEAL_STEP: 100,
  BONUS_STEP: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20,
  MIN_ANSWERS: 7
};

export const removeLives = (lives, answer) => {
  let timeoutAnswer = (answer.time > Game.TIME) ? true : false;
  let gamerLives = lives;
  if (timeoutAnswer) {
    gamerLives -= 1;
  }
  return gamerLives;
};

export const gameTimer = (time, callback) => {
  try {
    let lastTime = time;
    callback(lastTime);
    gameTimer.timerInterval = setInterval(() => {
      callback(lastTime - 1);
      lastTime--;
      if (lastTime === -1) {
        gameTimer.pause();
        callback(`Time Out!`);
      }
    }, 1000);
    return true;
  } catch (err) {
    return false;
  }
};

gameTimer.pause = () => {
  clearInterval(gameTimer.timerInterval);
};

gameTimer.start = (time, callback) => {
  const result = gameTimer(time, callback);
  return result;
};

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

export const changeLevels = (level, answers, callbackGame, callbackScore) => {
  let curLevel = level;
  const result = {
    lives: callbackGame(answers),
    level: curLevel + 1,
    score: callbackScore(answers, callbackGame(answers))
  };
  return result;
};

export const showScreen = (elem) => {
  const mainElement = document.querySelector(`#main`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(elem);
};

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const backToStart = (screen, startScreen) => {
  const buttonBack = screen.querySelector(`.back`);
  if (buttonBack) {
    buttonBack.addEventListener(`click`, () => {
      showScreen(startScreen);
    });
  }
};
