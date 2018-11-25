// шаблонизатор уровней и экранов
export default (header, template, initial, data, photos = null) => {
  const screen = document.createElement(`div`);
  screen.classList.add(`screen`);
  if (initial) {
    screen.classList.add(`screen--game`);
  }
  if (!photos) {
    screen.appendChild(header(initial));
    screen.appendChild(template(initial, data));
  } else {
    screen.appendChild(header(initial));
    screen.appendChild(template(initial, data, photos));
  }
  return screen;
};
