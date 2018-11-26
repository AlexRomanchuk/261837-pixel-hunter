// шаблон 3 уровня
import {Game, getElementFromTemplate, addStats, showScreen, exit} from '../js/util.js';
import header from '../js/game-header.js';
import {openScreen} from '../js/game.js';
import stats from '../js/stats-template.js';
import renderResults from '../js/templater.js';
import resultsTemplate from '../js/results-template.js';
export default (initial, data, photos) => {
  const content = `<section class="game">
    <p class="game__task">${data.task}</p>
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
  addStats(gameThreeScreen, stats(initial.answers));
  const imagesAnswers = gameThreeScreen.querySelectorAll(`.game__option img`);

  const checkImage = (answer) => {
    const result = answer === data.answer;
    if (!result) {
      initial.lives = initial.lives - 1;
    }
    initial.answers.push({
      right: result,
      time: initial.time
    });
    if (initial.lives < 0) {
      exit(initial, renderResults, header, resultsTemplate);
    } else {
      showScreen(openScreen(initial));
    }
  };
  if (initial.answers.length === Game.COUNT_QUESTIONS) {
    setTimeout(() => {
      exit(initial, renderResults, header, resultsTemplate);
    }, 200);
  }
  imagesAnswers.forEach((img) => {
    img.addEventListener(`click`, () => {
      checkImage(img.src);
    });
  });
  return gameThreeScreen;
};
