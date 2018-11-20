import {countScore} from '../js/util.js';
import {assert} from 'chai';

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
