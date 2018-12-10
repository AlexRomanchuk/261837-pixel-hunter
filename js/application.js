// связь приложения
import Intro from './intro';
import Rules from './rules';
import Greeting from './greeting';
import {showScreen} from './util';
import GameModel from './game-model';
import GameController from './game-controller';
import Results from './results';
import ErrorScreen from './error-screen';
window.gameData = [];

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
    Application.showGreeting(window.gameData);
  })
  .catch((err) => Application.showError(err.message));

export default class Application {
  static showError(message) {
    showScreen(new ErrorScreen(message).domElement);
  }
  static showIntro() {
    const intro = new Intro();
    showScreen(intro.domElement);
  }
  static showGreeting() {
    const greeting = new Greeting();
    showScreen(greeting.domElement);
  }
  static showRules() {
    const rules = new Rules();
    showScreen(rules.domElement);
  }
  static showGame(data) {
    const model = new GameModel(data);
    const controller = new GameController(model, data);
    controller.start();
  }
  static showStats(answers) {
    const statistics = new Results(answers);
    showScreen(statistics.domElement);
  }
}
