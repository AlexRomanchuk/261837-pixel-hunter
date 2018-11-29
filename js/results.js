// результаты игр
import AbstractScreen from './abstract-screen';
import stats from './stats-template';
import {countTotal} from './util';

const createTableOfResults = (answers) => {
  const createRow = (template) => {
    const tr = document.createElement(`tr`);
    tr.innerHTML = template;
    return tr;
  };

  const domResults = document.createElement(`section`);
  domResults.classList.add(`result`);
  let i = 1;
  for (let listAnswers of answers) {
    const table = document.createElement(`table`);
    table.classList.add(`result__table`);
    const rowStats = createRow(`<td class="result__number">${i}</td>
        <td class="result__stats" colspan="2">
        </td>
        <td class="result__points">× ${countTotal(listAnswers).step}</td>
        <td class="result__total">${countTotal(listAnswers).score}</td>`);
    const tdStats = rowStats.querySelector(`.result__stats`);
    tdStats.appendChild(stats(listAnswers));
    table.appendChild(rowStats);
    let bonusFast = 0;
    if (countTotal(listAnswers).countBonuses > 0) {
      bonusFast = countTotal(listAnswers).countBonuses * countTotal(listAnswers).bonus;
      const rowBonuses = createRow(`<td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countTotal(listAnswers).countBonuses} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${countTotal(listAnswers).bonus}</td>
        <td class="result__total">${bonusFast}</td>`);
      table.appendChild(rowBonuses);
    }
    let bonusLives = 0;
    if (countTotal(listAnswers).lives > 0) {
      bonusLives = countTotal(listAnswers).lives * countTotal(listAnswers).bonus;
      const rowLives = createRow(`<td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${countTotal(listAnswers).lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${countTotal(listAnswers).bonus}</td>
        <td class="result__total">${bonusLives}</td>`);
      table.appendChild(rowLives);
    }
    let fineSlow = 0;
    if (countTotal(listAnswers).countFines > 0) {
      fineSlow = countTotal(listAnswers).countFines * -countTotal(listAnswers).bonus;
      const rowFines = createRow(`<td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countTotal(listAnswers).countFines} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${countTotal(listAnswers).bonus}</td>
        <td class="result__total">${fineSlow}</td>`);
      table.appendChild(rowFines);
    }
    if (fineSlow !== 0 || bonusLives !== 0 || bonusFast !== 0) {
      const rowTotal = createRow(`<td colspan="5" class="result__total  result__total--final">
        ${countTotal(listAnswers).score + fineSlow + bonusLives + bonusFast}
      </td>`);
      table.appendChild(rowTotal);
    }
    domResults.appendChild(table);
    i++;
  }
  return domResults;
};

export default class Results extends AbstractScreen {
  constructor(answers) {
    super();
    this.answers = answers;
  }
  get header() {
    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>`;
  }
  get template() {
    return `${this.header}<div class="table"></div>`;
  }
  bind() {
    const section = this.domElement.querySelector(`.table`);
    section.appendChild(createTableOfResults(this.answers));
  }
}
