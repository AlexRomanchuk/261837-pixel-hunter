// связь приложения
import Intro from './intro';
import Rules from './rules';
import Greeting from './greeting';
import {showScreen, showWithCrossFade} from './util';
import GameModel from './game-model';
import GameController from './game-controller';
import Results from './results';
import ErrorScreen from './error-screen';
window.gameData = false;
let loadedImages = 0;
let hiddenImages = null;
const countLoadedImages = (listImages, screen) => {
  loadedImages++;
  if (listImages && listImages.length === loadedImages) {
    Application.showGreeting(screen);
    return true;
  }
  return false;
};
export default class Application {
  static loadData(screen) {
    const whenDataAreLoaded = window.fetch(`https://es.dump.academy/pixel-hunter/questions`);
    whenDataAreLoaded
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка при загрузке данных. Статус: ${response.status} ${response.statusText}`);
      })
      .then((data) => {
        window.gameData = Array.from(data);
        const body = document.querySelector(`body`);
        // создание скрытых изображений на загрузку
        for (let level of window.gameData) {
          for (let answer of level.answers) {
            const hiddenImage = document.createElement(`img`);
            hiddenImage.src = answer.image.url;
            hiddenImage.classList.add(`preload__hidden`);
            hiddenImage.style = `display: none`;
            hiddenImage.onload = () => {
              countLoadedImages(hiddenImages, screen);
            };
            body.appendChild(hiddenImage, screen);
          }
        }
        hiddenImages = document.querySelectorAll(`.preload__hidden`);
        countLoadedImages(hiddenImages);
      })
      .catch((err) => Application.showError(err.message));
  }
  static showError(message) {
    showScreen(new ErrorScreen(message).domElement);
  }
  static showIntro() {
    const intro = new Intro();
    showScreen(intro.domElement);
    Application.loadData(intro.domElement);
  }
  // в зависимости от переданного DOM текущего экрана показывать с кроссфейдом или сразу.
  // во избежание возможных глюков с игровых экранов переход реализован без кроссфейда.
  static showGreeting(screen = null) {
    const greeting = new Greeting();
    if (screen) {
      showWithCrossFade(screen, greeting.domElement);
    } else {
      showScreen(greeting.domElement);
    }
  }
  static showRules() {
    const rules = new Rules();
    showScreen(rules.domElement);
  }
  static showGame(data) {
    const model = new GameModel(data);
    const controller = new GameController(model);
    controller.start();
  }
  static showStats(answers) {
    const statistics = new Results(answers);
    showScreen(statistics.domElement);
  }
}
