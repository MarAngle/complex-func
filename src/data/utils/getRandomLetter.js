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

// 获取随机字符=>列表生成考虑提前，避免重复逻辑，分离该函数
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
