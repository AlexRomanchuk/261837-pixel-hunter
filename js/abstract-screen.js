// общий класс экрана
import {getElementFromTemplate} from './util';
export default class AbstractScreen {
  constructor() {
    if (new.target === AbstractScreen) {
      throw new Error(`Нельзя вызывать абстрактный класс.`);
    }
  }
  get header() {
    return false;
  }
  get template() {
    return `Шаблон обязателен`;
  }
  get domElement() {
    if (this._domElement) {
      return this._domElement;
    }
    this._domElement = this.render();
    this.bind(this._domElement);
    return this._domElement;
  }
  render() {
    return getElementFromTemplate(this.template);
  }
  bind() {
    return false;
  }
  onAnswer() {
  }
  onClick() {
  }
  onExit() {
  }
}
