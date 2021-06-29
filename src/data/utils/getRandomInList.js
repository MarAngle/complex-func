import getRandomNum from './getRandomNum'

function getRandomInList(list) {
  let size = list.length
  let index = getRandomNum(0, size)
  return list[index]
}

export default getRandomInList
