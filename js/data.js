// данные
import {Game} from './util';
export const albumImages = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const initialLevel = {
  itIsGame: false,
  level: 1,
  time: 0,
  lives: Game.LIVES,
  answers: [],
  results: []
};

export const levels = {
  'game1': {
    selector: ``,
    rule: `<li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    answer: `photo,paint`,
    template: `<div class="game__option">
      <img src="${albumImages.paintings[1]}" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="${albumImages.photos[1]}" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`
  },
  'game2': {
    selector: `game__content--wide`,
    rule: `<li>Угадай 10 раз для одного изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Изображение может казаться фотографией, но на деле быть рисунком.</li>`,
    task: `Угадай, фото или рисунок?`,
    answer: `paint`,
    template: `<div class="game__option">
      <img src="${albumImages.paintings[2]}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`
  },
  'game3': {
    selector: `game__content--triple`,
    rule: `<li>Найди и выбери рисунок среди трех изображений (10 раз!).</li>
    <li>Среди изображений есть один рисунок</li>`,
    task: `Найдите рисунок среди изображений`,
    answer: `http://i.imgur.com/DKR1HtB.jpg`,
    template: `<div class="game__option">
      <img src="${albumImages.paintings[1]}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="${albumImages.photos[2]}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${albumImages.paintings[0]}" alt="Option 3" width="304" height="455">
    </div>`
  }
};
