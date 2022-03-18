import { player1, player2 } from './players/index.js';
import { generateLogs } from './logs/index.js';
import * as game from './game/index.js';

const init = () => {
  const $arenas = document.querySelector('div.arenas');
  const $randomButton = document.querySelector('.arenas .button');
  const $formFight = document.querySelector('.control');

  $arenas.appendChild(game.createPlayer(player1, $arenas));
  $arenas.appendChild(game.createPlayer(player2, $arenas));

  generateLogs('start', player1, player2);

  $formFight.addEventListener('submit', function(evt){
    evt.preventDefault();

    const enemy = game.enemyAttack();
    const attack = game.myAttack($formFight);

    if(attack.hit !== enemy.defence){
      player2.changeHP(attack.value);
      player2.renderHP.call(player2);
      generateLogs('hit', player1, player2, attack.value);
    } else {
      generateLogs('defence', player1, player2);
    }

    if(attack.defence !== enemy.hit){
      player1.changeHP(enemy.value);
      player1.renderHP.call(player1);
      generateLogs('hit', player2, player1, enemy.value);
    } else {
      generateLogs('defence', player2, player1);
    }

    game.resultWins($arenas, $randomButton);
  });
}

init();
