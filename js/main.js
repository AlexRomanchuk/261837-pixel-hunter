// центр приложения

import {showScreen, backToStart} from '../js/util.js';

import introScreen from '../js/intro.js';
import greetingScreen from '../js/greeting.js';
import statsScreen from '../js/stats.js';
import rulesScreen from '../js/rules.js';
import gameOneScreen from '../js/game-1.js';
import gameTwoScreen from '../js/game-2.js';
import gameThreeScreen from '../js/game-3.js';

showScreen(introScreen);

backToStart(statsScreen, greetingScreen);
backToStart(rulesScreen, greetingScreen);
backToStart(gameOneScreen, greetingScreen);
backToStart(gameTwoScreen, greetingScreen);
backToStart(gameThreeScreen, greetingScreen);
