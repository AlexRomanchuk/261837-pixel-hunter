// шаблон 3 уровня
import {Game, getElementFromTemplate, addStats, showScreen} from '../js/util.js';
import header from '../js/game-header.js';
import {initialLevel} from '../js/data.js';
import {openLevel} from '../js/game.js';
import stats from '../js/stats-template.js';
import statsScreen from '../js/stats.js';
const level3Initial = Object.assign({}, initialLevel, {
  'answers': [],
  'lives': initialLevel.lives
});
let answers = 0;
export default (initial, data, photos) => {
  const content = `${header(level3Initial)}<section class="game">
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${photos.paintings[1]}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${photos.photos[2]}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${photos.paintings[0]}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    </section>`;
  const gameThreeScreen = getElementFromTemplate(content);
  addStats(gameThreeScreen, stats(level3Initial.answers));
  const imagesAnswers = gameThreeScreen.querySelectorAll(`.game__option img`);

  const checkImage = (answer) => {
    const result = answer === data.answer;
    if (!result) {
      level3Initial.lives = level3Initial.lives - 1;
    }
    level3Initial.answers.push({
      right: result,
      time: 15
    });
    answers++;
    showScreen(openLevel(initial));
  };
  if (answers === Game.COUNT_QUESTIONS) {
    setTimeout(() => {
      showScreen(statsScreen);
    }, 1500);
  }
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      checkImage(img.src);
    });
  });
  return gameThreeScreen;
};
