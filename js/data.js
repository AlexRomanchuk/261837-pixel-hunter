// данные
import {Game} from '../js/util.js';
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
    rule: `<li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    answer: `photo,paint`
  },
  'game2': {
    rule: `<li>Угадай 10 раз для одного изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Изображение может казаться фотографией, но на деле быть рисунком.</li>`,
    task: `Угадай, фото или рисунок?`,
    answer: `paint`
  },
  'game3': {
    rule: `<li>Найди и выбери рисунок среди трех изображений (10 раз!).</li>
    <li>Среди изображений есть один рисунок</li>`,
    task: `Найдите рисунок среди изображений`,
    answer: `http://i.imgur.com/DKR1HtB.jpg`
  }
};
