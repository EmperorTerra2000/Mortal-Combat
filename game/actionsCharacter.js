import { HIT, ATTACK } from '../constants/index.js';
import { getRandom } from '../utils/index.js';

/**
 * определение параметров атак игрока
 * @returns {Object}
 */
export const myAttack = ($formFight) => {
  const attack = {};

  for (let item of $formFight){
    if(item.checked && item.name === 'hit'){
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if(item.checked && item.name === 'defence'){
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

/**
 * определение параметров атак ИИ
 * @returns {Object}
 */
export const enemyAttack = () => {
  const lengthArr = ATTACK.length;
  const hit = ATTACK[getRandom(lengthArr) - 1];
  const defence = ATTACK[getRandom(lengthArr) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}