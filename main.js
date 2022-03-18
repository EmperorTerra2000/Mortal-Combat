import Game from './game/index.js';

const $arenas = document.querySelector('div.arenas');

const game = new Game({
  root: $arenas,
});

game.start();
