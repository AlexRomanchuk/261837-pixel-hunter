// стартовая страница
import AbstractScreen from './abstract-screen';
export default class ErrorScreen extends AbstractScreen {
  constructor(message) {
    super();
    this.message = message;
  }
  get template() {
    return `<section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.message}</p>
      </div>
    </section>`;
  }
}
