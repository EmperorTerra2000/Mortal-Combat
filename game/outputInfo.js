import { player1, player2 } from '../players/index.js';
import { generateLogs } from '../logs/index.js';
import { createReloadButton, createElement } from './createElementsDocument.js';

/**
 * текст с победителем
 * @param {string} name 
 * @returns {HTMLelement}
 */
export const playerWins = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  if(name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

/**
 * выводим результат боя
 */
export const resultWins = ($arenas, $randomButton) => {
  if(player1.hp === 0 || player2.hp === 0){
    $randomButton.disabled = true;

    $arenas.appendChild(createReloadButton());
  }

  if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
    generateLogs('end', player2, player1);
  } else if(player1.hp > player2.hp && player2.hp === 0) {
    $arenas.appendChild(playerWins(player1.name));
    generateLogs('end', player1, player2);
  } else if(player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
    generateLogs('draw');
  }
}