// данные
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
  level: 1,
  lives: 3,
  answers: []
};

export const levels = {
  'game1': {
    rule: `Фотографиями или рисунками могут быть оба изображения`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    answer: `photo,paint`
  },
  'game2': {
    rule: `Изображение может казаться фотографией, но на деле быть рисунком`,
    task: `Угадай, фото или рисунок?`,
    answer: `paint`
  },
  'game3': {
    rule: `Среди изображений есть один рисунок`,
    task: `Найдите рисунок среди изображений`,
    answer: `http://i.imgur.com/DKR1HtB.jpg`
  }
};
