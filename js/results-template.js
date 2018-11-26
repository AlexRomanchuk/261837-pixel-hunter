// результаты игр
import stats from '../js/stats-template.js';
import {countTotal} from '../js/util.js';

export default (answers) => {
  const createRow = (template) => {
    const tr = document.createElement(`tr`);
    tr.innerHTML = template;
    return tr;
  };

  const domResults = document.createElement(`section`);
  domResults.classList.add(`result`);
  let i = 1;
  for (let listAnswers of answers.results) {
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
