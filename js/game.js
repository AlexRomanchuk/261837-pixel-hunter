// игра
import {gameTimer} from './util';
import {levels, albumImages} from './data';
import game1Template from './game1-template';
import game2Template from './game2-template';
import game3Template from './game3-template';
import header from './game-header';
import createScreen from './templater';

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
