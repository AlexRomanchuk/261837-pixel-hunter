// статистика
/**
 * Шаблонизатор статистики
 * Возвращает DOM статистики в виде значков
 *
 * @param {array} answers Массив ответов.
 * @return {DOM} Список UL значков.
 */
import {Game} from './util';
export default class StatsTemplate {
  constructor(answers) {
    this.answers = answers;
    this.statsList = document.createElement(`ul`);
  }
  render() {
    this.statsList.classList.add(`stats`);
    for (let i = 0; i < Game.COUNT_QUESTIONS; i++) {
      const statsItem = document.createElement(`li`);
      statsItem.classList.add(`stats__result`);
      if (!this.answers[i]) {
        statsItem.classList.add(`stats__result--unknown`);
      } else if (this.answers[i].right && this.answers[i].time < Game.FAST_ANSWER_TIME) {
        statsItem.classList.add(`stats__result--fast`);
      } else if (this.answers[i].right && this.answers[i].time > Game.SLOW_ANSWER_TIME) {
        statsItem.classList.add(`stats__result--slow`);
      } else if (this.answers[i].right) {
        statsItem.classList.add(`stats__result--correct`);
      } else {
        statsItem.classList.add(`stats__result--wrong`);
      }
      this.statsList.appendChild(statsItem);
    }
    return this.statsList;
  }
}
