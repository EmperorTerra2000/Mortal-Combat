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
export const generateLogs = (type, { name: playerName1 }, { name: playerName2, hp }, damage) => {
  let text = '';

  switch (type) {
    case 'hit':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerKick]', playerName1)
        .replace('[playerDefence]', playerName2)} [-${damage}] [${hp}/100]`;
      break;

    case 'defence':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerKick]', playerName1)
        .replace('[playerDefence]', playerName2)} [missed]`;
      break;

    case 'start':
      text = `${getLogsRandom(type)
        .replace('[time]', getDateNow())
        .replace('[player1]', playerName1)
        .replace('[player2]', playerName2)}`;
      break;

    case 'end':
      text = `[${getDateNow()}] ${getLogsRandom(type)
        .replace('[playerWins]', playerName1)
        .replace('[playerLose]', playerName2)}`;
      break;

    case 'draw':
      text = `[${getDateNow()}] ${getLogsRandom(type)}`;
      break;

    default:
      break;
  }

  const el = `<p>${text}</p>`;

  $chat.insertAdjacentHTML('afterbegin', el);
};

/**
 * Возвращает строку с логом
 * @param {string} type
 * @returns {string}
 */
export const getLogsRandom = (type) => {
  const lengthText = LOGS[type].length;

  if (!Array.isArray(LOGS[type])) {
    return LOGS[type];
  }

  return LOGS[type][getRandom(lengthText - 1)];
};
