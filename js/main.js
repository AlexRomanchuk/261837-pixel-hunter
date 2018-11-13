'use strict';

const KeyCode = {
  LEFT: 37,
  RIGHT: 39
};
const mainElement = document.querySelector(`#main`);
const showScreen = (elem) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(elem.cloneNode(true));
};

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const screens = Array.from(document.querySelectorAll(`template`)).map(wrap);

let currentScreen = 1;

showScreen(screens[currentScreen]);

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentScreen = index;
  showScreen(screens[currentScreen]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCode.LEFT:
      selectScreen(currentScreen - 1);
      break;
    case KeyCode.RIGHT:
      selectScreen(currentScreen + 1);
      break;
  }
});

const body = document.querySelector(`body`);
const script = document.querySelector(`script`);
const buttons = document.createElement(`div`);
buttons.classList.add(`arrows__wrap`);
buttons.innerHTML = `<style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      position: relative;
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
      z-index: 2;
    }
  </style>
  <button class="arrows__btn arrows__btn--left"><-</button>
  <button class="arrows__btn arrows__btn--right">-></button>`;

body.insertBefore(buttons, script);

const buttonLeft = document.querySelector(`.arrows__btn--left`);
const buttonRight = document.querySelector(`.arrows__btn--right`);

buttonLeft.addEventListener(`click`, () => {
  selectScreen(currentScreen - 1);
});

buttonRight.addEventListener(`click`, () => {
  selectScreen(currentScreen + 1);
});
