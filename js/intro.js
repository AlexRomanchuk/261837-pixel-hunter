// стартовая страница
import AbstractScreen from './abstract-screen';
import Application from './application';
export default class Intro extends AbstractScreen {
  constructor() {
    super();
  }
  get template() {
    return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }
  bind() {
    const asterisk = this.domElement.querySelector(`.intro__asterisk`);
    asterisk.addEventListener(`click`, () => {
      Application.showGreeting();
    });
  }
}
