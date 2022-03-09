const $arenas = document.querySelector('div.arenas');
const $randomButton = document.querySelector('.arenas .button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
  'Результат удара [playerWins]: [playerLose] - труп',
  '[playerLose] погиб от удара бойца [playerWins]',
  'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
  '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
  '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
  '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
  '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
  '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
  '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
  '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
  '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
  '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
  '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
  '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
  '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
  '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
  '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
  '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
  '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
  '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
  '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
  '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
  '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
  '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
  '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
  '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
  '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
  '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

/**
 * сохдание элемента документа
 * @param {string} tag 
 * @param {string} className 
 * @returns {HTMLelement}
 */
function createElement(tag, className) {
  const $tag = document.createElement(tag);
  
  if(className) {
    $tag.classList.add(className);
  }

  return $tag;
}

/**
 * создание персонажа
 * @param {string, number, string, number} param0 
 * @returns {HTMLelement}
 */
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

/**
 * атака персонажа
 */
function attack() {
  console.log(`${this.name} fight`);
}

/**
 * генерация случайного числа
 * @param {number} number 
 * @returns {number}
 */
function getRandom(number) {
  return Math.ceil(Math.random() * number);
}


/**
 * 
 * @param {number} minusHP 
 */
function changeHP(minusHP) {
  this.hp -= getRandom(minusHP);

  if(this.hp <= 0){
    this.hp = 0;
  }
}

/**
 * находим элемент life
 * @returns {HTMLelement}
 */
function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

/**
 * рендер шкалы здоровья
 */
function renderHP() {
  this.elHP().style.width = this.hp + '%';
  this.elHP().innerText = this.hp;
}

/**
 * определение параметров атак ИИ
 * @returns {Object}
 */
function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

/**
 * создание button перезагрузки страницы
 * @returns {HTMLelement}
 */
function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  handleClickReloadButton($reloadButton);

  $reloadButton.innerText = 'Restart';

  $reloadWrap.appendChild($reloadButton);

  return $reloadWrap;
}

/**
 * установка прослушки для баттона
 * @param {HTMLelement} $reloadButton 
 */
function handleClickReloadButton($reloadButton) {
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
}

/**
 * текст с победителем
 * @param {string} name 
 * @returns {HTMLelement}
 */
function playerWins(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  if(name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

/**
 * определение параметров атак игрока
 * @returns {Object}
 */
function myAttack() {
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
 * выводим результат боя
 */
function resultWins() {
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

/**
 * Возвращает время
 * @returns {Object}
 */
function getDateNow() {
  const nowDate = new Date();
  let textDate = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
  textDate += nowDate.getMinutes() < 10 ? ':' + '0' + nowDate.getMinutes() : ':' + nowDate.getMinutes();
  textDate += nowDate.getSeconds() < 10 ? ':' + '0' + nowDate.getSeconds() : ':' + nowDate.getSeconds();

  return textDate;
}

/**
 * Возвращает строку с логом
 * @param {string} type 
 * @returns {string}
 */
function getLogsRandom(type) {
  const lengthText = logs[type].length;

  if(!Array.isArray(logs[type])) {
    return logs[type];
  }

  return logs[type][getRandom(lengthText - 1)];
}

/**
 * генерация логов
 * @param {string} type 
 * @param {object} player1 
 * @param {object} player2 
 * @param {number} damage 
 */
function generateLogs(type, player1, player2, damage) {
  let text = '';

  switch (type) {
    case 'hit':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)} [-${damage}] [${player2.hp}/100]`;
      break;

    case 'defence':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)} [missed]`;
      break;

    case 'start':
      text = `${getLogsRandom(type)
        .replace('[time]', getDateNow())
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name)}`;
      break;

    case 'end':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name)}`;
      break;

    case 'draw':
      text = `[${getDateNow()}] ${getLogsRandom(type)}`;
      break;

    default:
      break;
  }

  const el = `<p>${text}</p>`;

  $chat.insertAdjacentHTML('afterbegin', el);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(evt){
  evt.preventDefault();

  const enemy = enemyAttack();
  const attack = myAttack();

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

  resultWins();
});