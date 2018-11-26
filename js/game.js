// игра
import {gameTimer} from '../js/util.js';
import {levels, albumImages} from '../js/data.js';
import game1Template from '../js/game1-template.js';
import game2Template from '../js/game2-template.js';
import game3Template from '../js/game3-template.js';
import header from '../js/game-header.js';
import createScreen from '../js/templater.js';

export const openScreen = (initial) => {
  gameTimer.pause();
  initial.time = 0;
  switch (initial.level) {
    case 1:
      return createScreen(header, game1Template, initial, levels.game1, albumImages);
    case 2:
      return createScreen(header, game2Template, initial, levels.game2, albumImages);
    case 3:
      return createScreen(header, game3Template, initial, levels.game3, albumImages);
  }
  return false;
};
