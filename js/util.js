// утилиты

const mainElement = document.querySelector(`#main`);

export const showScreen = (elem) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(elem);
};

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const backToStart = (screen, startScreen) => {
  const buttonBack = screen.querySelector(`.back`);
  if (buttonBack) {
    buttonBack.addEventListener(`click`, () => {
      showScreen(startScreen);
    });
  }
};
