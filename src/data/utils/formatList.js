import formatItem from './formatItem'

function formatList(originList, option, targetList = []) {
  for (let n in originList) {
    targetList.push(formatItem(originList[n], option))
  }
  return targetList
}

export default formatList
