/* // игра 3
import {Game, showScreen} from '../js/util.js';
import {levels, initialLevel, albumImages} from '../js/data.js';
import levelStatsTemplate from '../js/stats-template.js';
import gameTemplate from '../js/game-template.js';
import game3Template from '../js/game3-template.js';
import header from '../js/game-header.js';
import statsScreen from '../js/stats.js';

const task = levels.game3;

const gameThreeElement = gameTemplate(task, header(initialLevel), game3Template(albumImages), levelStatsTemplate(initialLevel.answers));

const imagesAnswers = gameThreeElement.querySelectorAll(`.game__option`);

imagesAnswers.forEach((img) => {
  img.addEventListener(`click`, () => {
    showScreen(statsScreen);
  });
});

export default gameThreeElement;
 */
