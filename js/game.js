// игра 1
import {levels, albumImages} from '../js/data.js';
import game1Template from '../js/game1-template.js';
import game2Template from '../js/game2-template.js';
import game3Template from '../js/game3-template.js';

export const openLevel = (initial) => {
  let level = null;
  switch (initial.level) {
    case 1:
      level = game1Template(initial, levels.game1, albumImages);
      break;
    case 2:
      level = game2Template(initial, levels.game2, albumImages);
      break;
    case 3:
      level = game3Template(initial, levels.game3, albumImages);
      break;
  }
  return level;
};
