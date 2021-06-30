import getRandomInList from './getRandomInList'

let letterData = {
  small: [],
  big: [],
  number: []
}
for (let bi = 97; bi < 123; bi++) {
  letterData.small.push(String.fromCharCode(bi))
}
for (let si = 65; si < 91; si++) {
  letterData.big.push(String.fromCharCode(si))
}
for (let ni = 0; ni < 10; ni++) {
  letterData.number.push(ni.toString())
}

/**
 * 获取随机字符
 * @param {object} [letter] 字符串库设置
 * @param {boolean} [letter.small] 字符串库设置,小写字母,默认为真
 * @param {boolean} [letter.big] 字符串库设置,大写字母,默认为真
 * @param {boolean} [letter.number] 字符串库设置,整数,默认为真
 * @returns {string}
 */
function getRandomLetter(letter) {
  let list = []
  if (!letter) {
    letter = {
      small: true,
      big: true,
      number: true
    }
  }
  if (letter.small) {
    list = list.concat(letterData.small)
  }
  if (letter.big) {
    list = list.concat(letterData.big)
  }
  if (letter.number) {
    list = list.concat(letterData.number)
  }
  return getRandomInList(list)
}

export default getRandomLetter
