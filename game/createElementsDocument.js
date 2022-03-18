import { handleClickReloadButton } from './handleMethods.js';

/**
 * создание элемента документа
 * @param {string} tag 
 * @param {string} className 
 * @returns {HTMLelement}
 */
export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  
  if(className) {
    $tag.classList.add(className);
  }

  return $tag;
}

/**
 * создание персонажа
 * @param {string, number, string, number} param0 
 * @returns {HTMLelement}
 */
export const createPlayer = ({name, hp, img, player}, $arenas) => {
  // создание элементов документа
  const $player = createElement('div', 'player' + player);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $imgCharacter = createElement('img');

  // построение DOM дерева из объявленных недавно элементов
  $player.appendChild($progressBar);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($imgCharacter);

  // присваивание необходимых параметров
  $life.style.width = hp + '%';
  $name.innerText = name;
  $life.innerText = hp;
  $imgCharacter.src = img;

  // добавление элементов непосредственно к DOM дереву
  $arenas.appendChild($player);

  return $player;
}

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
}