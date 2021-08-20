import config from '../../../config'
import parseNum from '../number/parseNum'

function getOffsetTime(offset, unit = 'sec', option = {}) {
  let startUnit = option.start || unit
  let endUnit = option.end || 'date'
  let data = {}
  let list = []
  offset = Number(offset)
  let startIndex = config.time.dict.list.indexOf(startUnit)
  let endIndex = config.time.dict.list.indexOf(endUnit)
  let currentIndex = config.time.dict.list.indexOf(unit)
  console.log(startIndex, endIndex, currentIndex)
  if (startIndex > currentIndex) {
    let [integer, decimal] = parseNum(offset)
    // down
    if (decimal) {
      offset = integer
      let downOffset = decimal
      for (let i = currentIndex + 1; i <= startIndex; i++) {
        const prop = config.time.dict.list[i]
        const dict = config.time.dict.data[prop]
        const rate = dict.rate.down
        let currentData
        downOffset = downOffset * dict.rate.up
        if (!rate || i === startIndex) {
          currentData = downOffset
          downOffset = 0
        } else {
          let [currentInteger, currentDecimal] = parseNum(downOffset)
          if (currentDecimal) {
            currentData = currentInteger
            downOffset = currentDecimal
          } else {
            currentData = downOffset
            downOffset = 0
          }
        }
        data[prop] = currentData
        list.push(currentData)
        if (!downOffset) {
          break
        }
      }
    }
  }
  // up
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
        let [currentNumInteger, currentNumDecimal] = parseNum(currentNum)
        offset = currentNumInteger
        currentData = currentNumDecimal * rate
      }
    }
    data[prop] = currentData
    list.push(currentData)
    if (!offset) {
      break
    }
  }
  console.log(list, data)
  return data
}

export default getOffsetTime
