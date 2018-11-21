import {countScore} from '../js/util.js';
import {assert} from 'chai';

// Эмуляция ответов
const answersMin = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
];
const answersNorm = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  }
];

const answers1 = [
  {
    right: true,
    time: 15
  },
  {
    right: false,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: false,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: false,
    time: 15
  }
];

const answers2 = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  },
  {
    right: true,
    time: 5
  }
];

const answers3 = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: false,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  }
];

const answersWrong = [
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 25
  },
  {
    right: false,
    time: 5
  },
  {
    right: false,
    time: 5
  },
  {
    right: false,
    time: 5
  },
  {
    right: false,
    time: 5
  }
];

const answers8 = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: false,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  }
];

const answersTimeout = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 32
  },
  {
    right: false,
    time: 5
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 5
  }
];

const answersTimeout2 = [
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 25
  },
  {
    right: true,
    time: 6
  },
  {
    right: true,
    time: 16
  },
  {
    right: false,
    time: 32
  },
  {
    right: true,
    time: 8
  },
  {
    right: false,
    time: 32
  },
  {
    right: true,
    time: 5
  }
];

const answersTimeoutFailure = [
  {
    right: true,
    time: 13
  },
  {
    right: false,
    time: 33
  },
  {
    right: true,
    time: 15
  },
  {
    right: true,
    time: 12
  },
  {
    right: false,
    time: 31
  },
  {
    right: false,
    time: 34
  },
  {
    right: true,
    time: 15
  },
  {
    right: false,
    time: 34
  }
];

describe(`Function Count Score`, () => {
  it(`count answers < 7`, () => {
    assert.equal(countScore(answersMin, 3), -1);
  });
  it(`all answers are right and norm, 3 lives`, () => {
    assert.equal(countScore(answersNorm, 3), 1150);
  });
  it(`3 answers are wrong, 3 lives`, () => {
    assert.equal(countScore(answers1, 3), 850);
  });
  it(`all answers are right and 4 - fast, 3 lives`, () => {
    assert.equal(countScore(answers2, 3), 1350);
  });
  it(`9/10 answers are right, 3 slow, 5 norm, 2 fast, 2 lives`, () => {
    assert.equal(countScore(answers3, 2), 900);
  });
  it(`all answers are wrong, 0 lives`, () => {
    assert.equal(countScore(answersWrong, 0), 0);
  });
  it(`7/8 answers are right, 3 slow, 4 norm, 1 fast, 1 lives`, () => {
    assert.equal(countScore(answers8, 1), 700);
  });
});

import {removeLives} from '../js/util.js';

// Эмуляция игры
const testGame = (answers) => {
  let lives = 3;
  answers.forEach((answer) => {
    lives = removeLives(lives, answer);
  });
  if (lives < 0) {
    lives = -1;
  }
  return lives;
};

describe(`Test Count Lives`, () => {
  it(`no timeouts in answers`, () => {
    assert.equal(testGame(answersNorm), 3);
  });
  it(`1 timeout in answers`, () => {
    assert.equal(testGame(answersTimeout), 2);
  });
  it(`2 timeouts in answers`, () => {
    assert.equal(testGame(answersTimeout2), 1);
  });
  it(`>3 timeouts in answers, fail`, () => {
    assert.equal(testGame(answersTimeoutFailure), -1);
  });
});

import {changeLevels} from '../js/util.js';

describe(`Test Change Levels`, () => {
  it(`Game 1 completed`, () => {
    assert.equal(JSON.stringify((changeLevels(1, answersNorm, testGame, countScore))), JSON.stringify({
      lives: 3,
      level: 2,
      score: 1150
    }));
  });
  it(`Game 2 completed`, () => {
    assert.equal(JSON.stringify((changeLevels(2, answersTimeout, testGame, countScore))), JSON.stringify({
      lives: 2,
      level: 3,
      score: 750
    }));
  });
});

import {gameTimer} from '../js/util.js';

// Некоторый рабочий коллбэк
const getAnswerTime = (time) => {
  return time;
};

// Ошибочный коллбэк
const NotAFunction = 0;

describe(`Timer`, () => {
  it(`Timer: 30sec`, () => {
    assert.equal(gameTimer.start(30, getAnswerTime), true);
  });
  it(`Timer: Error Accoured`, () => {
    assert.equal(gameTimer.start(30, NotAFunction), false);
  });
});
