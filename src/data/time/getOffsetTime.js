import config from '../../../config'
import getDecimal from '../number/getDecimal'

function getOffsetTime(offset, unit = 'sec', option = {}) {
  let startUnit = option.start || unit
  let endUnit = option.end || 'date'
  let data = {}
  offset = Number(offset)
  let startIndex = config.time.dict.list.indexOf(startUnit)
  let endIndex = config.time.dict.list.indexOf(endUnit)
  let currentIndex = config.time.dict.list.indexOf(unit)
  // let decimal = getDecimal(offset)
  // if (decimal) {
  //   offset = Math.floor(offset)
  // }
  // down
  // up
  let list = []
  for (let i = currentIndex; i >= endIndex; i--) {
    const prop = config.time.dict.list[i]
    const dict = config.time.dict.data[prop]
    const rate = dict.rate.up
    let currentData
    if (!rate) {
      currentData = offset
      offset = 0
    } else {
      let currentNum = offset / rate
      if (currentNum < 1) {
        currentData = offset
        offset = 0
      } else {
        let currentNumDecimal = getDecimal(currentNum)
        offset = currentNum - currentNumDecimal
        currentData = currentNumDecimal * rate
        // offset =
        // currentNum = Math.floor(currentNum)
        // let tempNum = offset - currentNum * rate
        // offset = currentNum
        // currentNum = tempNum
      }
    }
    if (!offset) {
      break
    }
    data[prop] = currentData
    list.push(currentData)
  }
  console.log(list, data)
}

export default getOffsetTime
