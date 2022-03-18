import { createElement } from '../utils/index.js';

class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.player = props.player;
    this.weapon = props.weapon;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector;
  }

  /**
   * атака персонажа
   */
  attack = () => {
    console.log(`${this.name} fight`);
  };

  /**
   *
   * @param {number} minusHP
   */
  changeHP = (minusHP) => {
    this.hp -= minusHP;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  /**
   * находим элемент life
   * @returns {HTMLelement}
   */
  elHP = () => {
    return document.querySelector(`.${this.selector} .life`);
  };

  /**
   * рендер шкалы здоровья
   */
  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
    this.elHP().innerText = this.hp;
  };

  /**
   * создание персонажа
   * @param {string, number, string, number} param0
   * @returns {HTMLelement}
   */
  createPlayer = () => {
    // создание элементов документа
    const $player = createElement('div', `${this.selector}`);
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
    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $life.innerText = this.hp;
    $imgCharacter.src = this.img;

    const $root = document.querySelector(`.${this.rootSelector}`);

    // добавление элементов непосредственно к DOM дереву
    $root.appendChild($player);

    return $player;
  };
}

export default Player;
