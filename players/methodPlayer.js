import { getRandom } from '../utils/index.js';

/**
 * атака персонажа
 */
export function attack() {
  console.log(`${this.name} fight`);
}

/**
 * 
 * @param {number} minusHP 
 */
export function changeHP(minusHP) {
  this.hp -= getRandom(minusHP);

  if(this.hp <= 0) {
    this.hp = 0;
  }
}

/**
 * находим элемент life
 * @returns {HTMLelement}
 */
export function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

/**
 * рендер шкалы здоровья
 */
export function renderHP() {
  this.elHP().style.width = this.hp + '%';
  this.elHP().innerText = this.hp;
}