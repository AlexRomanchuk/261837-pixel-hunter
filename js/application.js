// связь приложения
import {levels} from './data';
import Intro from './intro';
import Rules from './rules';
import Greeting from './greeting';
import {showScreen} from './util';
import GameModel from './game-model';
import GameController from './game-controller';
import Results from './results';
export default class Application {
  static showIntro() {
    const intro = new Intro();
    showScreen(intro.domElement);
  }
  static showGreeting() {
    const greeting = new Greeting();
    showScreen(greeting.domElement);
  }
  static showRules() {
    const rules = new Rules(levels);
    showScreen(rules.domElement);
  }
  static showGame() {
    const model = new GameModel();
    const controller = new GameController(model);
    controller.start();
  }
  static showStats(answers) {
    const statistics = new Results(answers);
    showScreen(statistics.domElement);
  }
}
