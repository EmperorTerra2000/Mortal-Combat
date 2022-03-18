import { HIT, ATTACK } from '../constants/index.js';
import { getRandom, createReloadButton, createElement } from '../utils/index.js';
import { generateLogs } from '../logs/index.js';
import Player from '../players/index.js';

class Game {
  constructor({ root }) {
    this.root = root;
    this.form = root.querySelector('.control');
    this.player2 = new Player({
      player: 2,
      name: 'Subzero',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
      weapon: ['Кастеты', 'Катана', 'Гранатамет', 'Бомба'],
      rootSelector: 'arenas',
    });
    this.player1 = new Player({
      player: 1,
      name: 'Scorpion',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
      weapon: ['Стрела', 'Катана', 'Факел'],
      rootSelector: 'arenas',
    });
  }

  start = () => {
    this.player1.createPlayer();
    this.player2.createPlayer();

    generateLogs('start', this.player1, this.player2);

    this.submitResult();
  };

  /**
   * определение параметров атак игрока
   * @returns {Object}
   */
  myAttack = () => {
    const attack = {};

    for (let item of this.form) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  };

  /**
   * определение параметров атак ИИ
   * @returns {Object}
   */
  enemyAttack = () => {
    const lengthArr = ATTACK.length;
    const hit = ATTACK[getRandom(lengthArr) - 1];
    const defence = ATTACK[getRandom(lengthArr) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };

  /**
   * текст с победителем
   * @param {string} name
   * @returns {HTMLelement}
   */
  playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
      $loseTitle.innerText = name + ' wins';
    } else {
      $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
  };

  submitResult = () => {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = this.enemyAttack();
      const { hit, defence, value } = this.myAttack();

      if (hit !== defenceEnemy) {
        this.player2.changeHP(value);
        this.player2.renderHP();
        generateLogs('hit', this.player1, this.player2, value);
      } else {
        generateLogs('defence', this.player1, this.player2);
      }

      if (defence !== hitEnemy) {
        this.player1.changeHP(valueEnemy);
        this.player1.renderHP();
        generateLogs('hit', this.player2, this.player1, valueEnemy);
      } else {
        generateLogs('defence', this.player2, this.player1);
      }

      this.resultWins();
    });
  };

  /**
   * выводим результат боя
   */
  resultWins = () => {
    const $randomButton = document.querySelector('.arenas .button');

    if (this.player1.hp === 0 || this.player2.hp === 0) {
      $randomButton.disabled = true;

      this.root.appendChild(createReloadButton());
    }

    if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
      this.root.appendChild(this.playerWins(this.player2.name));
      generateLogs('end', this.player2, this.player1);
    } else if (this.player1.hp > this.player2.hp && this.player2.hp === 0) {
      this.root.appendChild(this.playerWins(this.player1.name));
      generateLogs('end', this.player1, this.player2);
    } else if (this.player1.hp === 0 && this.player2.hp === 0) {
      this.root.appendChild(this.playerWins());
      generateLogs('draw');
    }
  };
}

export default Game;
