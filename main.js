const $arenas = document.querySelector('div.arenas');
const $randomButton = document.querySelector('.arenas .button');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Стрела', 'Катана', 'Факел'],
  attack: function() {
    console.log(`${this.name} fight`);
  },
};

const player2 = {
  player: 2,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Кастеты', 'Катана', 'Гранатамет', 'Бомба'],
  attack: function() {
    console.log(`${this.name} fight`);
  },
};

// сохдание элемента документа
function createElement(tag, className) {
  const $tag = document.createElement(tag);
  
  if(className) {
    $tag.classList.add(className);
  }

  return $tag;
}

// создание персонажа
function createPlayer({name, hp, img, player}) {
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

// при нажатии на кнопку убывается шкала здоровья
function changeHP(player) {
  const $playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp -= Math.ceil(Math.random() * 20);
  $playerLife.style.width = (player.hp <= 0 ? 0 : player.hp) + '%';
  $playerLife.innerText = player.hp <= 0 ? 0 : player.hp;

  if(player.hp <= 0) {
    const numberPlayerWins = player.player === 1 ? 2 : 1;// определение победителя
    $randomButton.disabled = true;
    $arenas.appendChild(playerWins(numberPlayerWins));
  }
}

// текст с победителем
function playerWins(numberPlayerWins) {
  const $loseTitle = createElement('div', 'loseTitle');
  const $playerName = $arenas.querySelector('.player' + numberPlayerWins + ' .progressbar .name');

  $loseTitle.innerText = $playerName.innerText + ' wins';

  return $loseTitle;
}

$randomButton.addEventListener('click', function() {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));