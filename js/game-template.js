/* // шаблонизатор уровней
import {getElementFromTemplate} from '../js/util.js';
export default (data, header, template, stats) => {
  const content = `${header}<section class="game">
    <p class="game__task">${data.task}</p>
    ${template}
  </section>`;
  const DOMContent = getElementFromTemplate(content);
  const section = DOMContent.querySelector(`.game`);
  section.appendChild(stats);
  return DOMContent;
};
 */
