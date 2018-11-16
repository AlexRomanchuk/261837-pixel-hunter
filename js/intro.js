// стартовая страница

import {getElementFromTemplate, showScreen} from '../js/util.js';
import greetingScreen from '../js/greeting.js';

const introScreen = getElementFromTemplate(`<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);

const asterisk = introScreen.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => {
  showScreen(greetingScreen);
});

export default introScreen;
