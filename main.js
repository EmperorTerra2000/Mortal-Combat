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
  attack: function() {
    console.log(`${this.name} fight`);
  },
  changeHP,
  elHP,
  renderHP,
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

function getRandom(n) {
  return Math.ceil(Math.random() * n);
}

function changeHP(minusHP){
  this.hp = this.hp <= 0 ? 0 : this.hp - getRandom(minusHP);
}

function elHP(){
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP(){
  this.elHP().style.width = this.hp + '%';
  this.elHP().innerText = this.hp;
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  handleClickReloadButton($reloadButton);

  $reloadButton.innerText = 'Restart';

  $reloadWrap.appendChild($reloadButton);

  return $reloadWrap;
}

function handleClickReloadButton($reloadButton){
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
}

// текст с победителем
function playerWins(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  if(name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

$randomButton.addEventListener('click', function() {
  player1.changeHP(getRandom(20));
  player1.renderHP.call(player1);
  player2.changeHP(getRandom(20));
  player2.renderHP.call(player2);

  if(player1.hp === 0 || player2.hp === 0){
    $randomButton.disabled = true;

    $arenas.appendChild(createReloadButton());
  }

  if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if(player1.hp > player2.hp && player2.hp === 0) {
    $arenas.appendChild(playerWins(player1.name));
  } else if(player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));