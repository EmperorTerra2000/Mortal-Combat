import {attack, changeHP, elHP, renderHP} from './methodPlayer.js';

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Стрела', 'Катана', 'Факел'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Кастеты', 'Катана', 'Гранатамет', 'Бомба'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

export {
  player1,
  player2,
}