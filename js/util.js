// утилиты
export const Game = {
  COUNT_QUESTIONS: 10,
  IDEAL_STEP: 100,
  BONUS_STEP: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20,
  MIN_ANSWERS: 7
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
