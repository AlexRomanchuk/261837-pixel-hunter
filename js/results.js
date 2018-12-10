// результаты игр
import AbstractScreen from './abstract-screen';
import stats from './stats-template';
import {countTotal} from './util';
import Application from './application';

const createTableOfResults = (answers) => {
  const createRow = (template) => {
    const tr = document.createElement(`tr`);
    tr.innerHTML = template;
    return tr;
  };

  const domResults = document.createElement(`section`);
  const resultsHeader = document.createElement(`h2`);
  domResults.classList.add(`result`);
  resultsHeader.classList.add(`result__title`);
  resultsHeader.textContent = `Победа!`;
  domResults.appendChild(resultsHeader);
  let i = 1;
  for (let listAnswers of answers) {
    const table = document.createElement(`table`);
    table.classList.add(`result__table`);
    const rowStats = createRow(`<td class="result__number">${i}: <span class="username"></span></td>
        <td class="result__stats" colspan="2">
        </td>
        <td class="result__points">× ${countTotal(listAnswers.results).step}</td>
        <td class="result__total">${countTotal(listAnswers.results).score}</td>`);
    const tdStats = rowStats.querySelector(`.result__stats`);
    const gamerCell = rowStats.querySelector(`.username`);
    gamerCell.textContent = listAnswers.gamerName;
    tdStats.appendChild(stats(listAnswers.results));
    table.appendChild(rowStats);
    let bonusFast = 0;
    if (countTotal(listAnswers.results).countBonuses > 0) {
      bonusFast = countTotal(listAnswers.results).countBonuses * countTotal(listAnswers.results).bonus;
      const rowBonuses = createRow(`<td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${countTotal(listAnswers.results).countBonuses} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${countTotal(listAnswers.results).bonus}</td>
        <td class="result__total">${bonusFast}</td>`);
      table.appendChild(rowBonuses);
    }
    let bonusLives = 0;
    if (countTotal(listAnswers.results).lives > 0) {
      bonusLives = countTotal(listAnswers.results).lives * countTotal(listAnswers.results).bonus;
      const rowLives = createRow(`<td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${countTotal(listAnswers.results).lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${countTotal(listAnswers.results).bonus}</td>
        <td class="result__total">${bonusLives}</td>`);
      table.appendChild(rowLives);
    }
    let fineSlow = 0;
    if (countTotal(listAnswers.results).countFines > 0) {
      fineSlow = countTotal(listAnswers.results).countFines * -countTotal(listAnswers.results).bonus;
      const rowFines = createRow(`<td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${countTotal(listAnswers.results).countFines} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${countTotal(listAnswers.results).bonus}</td>
        <td class="result__total">${fineSlow}</td>`);
      table.appendChild(rowFines);
    }
    if (fineSlow !== 0 || bonusLives !== 0 || bonusFast !== 0) {
      const rowTotal = createRow(`<td colspan="5" class="result__total  result__total--final">
        ${countTotal(listAnswers.results).score + fineSlow + bonusLives + bonusFast}
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
    const buttonExit = this.domElement.querySelector(`.back`);
    buttonExit.addEventListener(`click`, () => {
      Application.showGreeting();
    });
  }
}
