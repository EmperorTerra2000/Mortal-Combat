/**
 * генерация случайного числа
 * @param {number} number 
 * @returns {number}
 */
 export const getRandom = (number) => Math.ceil(Math.random() * number);

 /**
 * Возвращает время в текстовом формате
 * @param {number} date 
 * @returns {string}
 */
export const getDateNormalType = (date) => date < 10 ? '0' + date : date;

/**
 * Возвращает время
 * @returns {Object}
 */
export const getDateNow = () => {
  const nowDate = new Date();
  const textDate = `${getDateNormalType(nowDate.getHours())}:${getDateNormalType(nowDate.getMinutes())}:${getDateNormalType(nowDate.getSeconds())}`;

  return textDate;
}