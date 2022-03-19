class Api {
  constructor(urlAddres) {
    this.urlAddres = urlAddres;
  }

  /**
   * Обработчик запроса
   * @param {string} res
   * @returns {object}
   */
  _handleResponse = (res) => {
    if (!res.ok) Promise.reject(`произошла ошибка: ${res.status}`);
    return res.json();
  };

  /**
   * возвращает рандомного пользователя (противника)
   */
  getRandomPlayer = () => {
    return fetch(`${this.urlAddres}/api/mk/player/choose`).then(this._handleResponse);
  };

  /**
   * запрос на файт
   * @param {string} hit
   * @param {string} defence
   */
  fightAction = ({ hit, defence }) => {
    return fetch(`${this.urlAddres}/api/mk/player/fight`, {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence,
      }),
    }).then(this._handleResponse);
  };
}

export default Api;
