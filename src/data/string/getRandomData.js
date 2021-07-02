import getRandomLetter from './getRandomLetter'

/**
 * 获取随机字符串
 * @param {object} option 设置项
 * @param {number} option.size 长度
 * @param {object} [option.letter] 字符串库
 * @param {boolean} [option.letter.small] 字符串库设置,小写字母,默认为真
 * @param {boolean} [option.letter.big] 字符串库设置,大写字母,默认为真
 * @param {boolean} [option.letter.number] 字符串库设置,整数,默认为真
 * @returns {string}
 */
function getRandomData({ size, letter }) {
  let data = ''
  for (let n = 0; n < size; n++) {
    data = data + getRandomLetter(letter)
  }
  return data
}

export default getRandomData
