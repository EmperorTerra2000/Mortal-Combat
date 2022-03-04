const $arenas = document.querySelector('div.arenas');

const scorpion = {
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Стрела', 'Катана', 'Факел'],
  attack: function() {
    console.log(`${this.name} fight`);
  },
};

const subzero = {
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Кастеты', 'Катана', 'Гранатамет', 'Бомба'],
  attack: function() {
    console.log(`${this.name} fight`);
  },
};

function createPlayer(className, {name, hp, img}) {
  // создание элементов документа
  const $player = document.createElement('div');
  const $progressBar = document.createElement('div');
  const $character = document.createElement('div');
  const $life = document.createElement('div');
  const $name = document.createElement('div');
  const $imgCharacter = document.createElement('img');

  // добавление класса элементам
  $player.classList.add(className);
  $progressBar.classList.add('progressbar');
  $character.classList.add('character');
  $life.classList.add('life');
  $name.classList.add('name');

  // построение DOM дерева из объявленных недавно элементов
  $player.appendChild($progressBar);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($imgCharacter);

  // присваивание необходимых параметров
  $life.style.width = '100%';
  $name.innerText = name;
  $life.innerText = hp;
  $imgCharacter.src = img;

  // добавление элементов непосредственно к DOM дереву
  $arenas.appendChild($player);
}

scorpion.attack();
subzero.attack();
createPlayer('player1', scorpion);
createPlayer('player2', subzero);