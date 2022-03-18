/**
 * генерация случайного числа
 * @param {number} number
 * @returns {number}
 */
export const getRandom = (number) => Math.ceil(Math.random() * number);

/**
 * Возвращает время в текстовом формате
 * @param {number} date
 * @returns {string}
 */
export const getDateNormalType = (date) => (date < 10 ? '0' + date : date);

/**
 * Возвращает время
 * @returns {Object}
 */
export const getDateNow = () => {
  const nowDate = new Date();
  const textDate = `${getDateNormalType(nowDate.getHours())}:${getDateNormalType(
    nowDate.getMinutes(),
  )}:${getDateNormalType(nowDate.getSeconds())}`;

  return textDate;
};

/**
 * создание элемента документа
 * @param {string} tag
 * @param {string} className
 * @returns {HTMLelement}
 */
export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

/**
 * создание button перезагрузки страницы
 * @returns {HTMLelement}
 */
export const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  handleClickReloadButton($reloadButton);

  $reloadButton.innerText = 'Restart';

  $reloadWrap.appendChild($reloadButton);

  return $reloadWrap;
};

/**
 * установка прослушки для баттона
 * @param {HTMLelement} $reloadButton
 */
export const handleClickReloadButton = ($reloadButton) => {
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
};
