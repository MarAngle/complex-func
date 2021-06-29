import data from './data'

function formatItem(originItem, option, targetItem = {}) {
  let optionData = option.data
  let optionUnadd = option.unadd
  for (let n in originItem) {
    if (optionData[n]) {
      targetItem[optionData[n]] = originItem[n]
    } else {
      if (!optionUnadd) {
        targetItem[n] = originItem[n]
      }
    }
  }
  return targetItem
}

export default formatItem
