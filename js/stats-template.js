// статистика
import {Game} from '../js/util.js';
export default (answers) => {
  const statsList = document.createElement(`ul`);
  statsList.classList.add(`stats`);
  for (let i = 0; i < Game.COUNT_QUESTIONS; i++) {
    const statsItem = document.createElement(`li`);
    statsItem.classList.add(`stats__result`);
    if (!answers[i]) {
      statsItem.classList.add(`stats__result--unknown`);
    } else if (answers[i].right && answers[i].time < Game.FAST_ANSWER_TIME) {
      statsItem.classList.add(`stats__result--fast`);
    } else if (answers[i].right && answers[i].time > Game.SLOW_ANSWER_TIME) {
      statsItem.classList.add(`stats__result--slow`);
    } else if (answers[i].right) {
      statsItem.classList.add(`stats__result--correct`);
    } else {
      statsItem.classList.add(`stats__result--wrong`);
    }
    statsList.appendChild(statsItem);
  }
  return statsList;
};
