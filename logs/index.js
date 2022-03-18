import LOGS from './logs.js';
import { getDateNow, getRandom } from '../utils/index.js';

const $chat = document.querySelector('.chat');

/**
 * генерация логов
 * @param {string} type 
 * @param {object} player1 
 * @param {object} player2 
 * @param {number} damage 
 */
export const generateLogs = (type, player1, player2, damage) => {
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

/**
 * Возвращает строку с логом
 * @param {string} type 
 * @returns {string}
 */
export const getLogsRandom = (type) => {
  const lengthText = LOGS[type].length;

  if(!Array.isArray(LOGS[type])) {
    return LOGS[type];
  }

  return LOGS[type][getRandom(lengthText - 1)];
}