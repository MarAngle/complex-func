import config from '../../../config'
import getNum from '../number/getNum'
import parseNum from '../number/parseNum'

function parseDownOffset(offset, dictList, data) {
  console.log('down', offset, ...dictList)
  for (let i = 0; i < dictList.length; i++) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = config.time.dict.data[prop]
      const rate = dict.rate.down
      offset = offset * dict.rate.up
      if (!rate || i === (dictList.length - 1)) {
        currentData = offset
        offset = 0
      } else {
        let [currentInteger, currentDecimal] = parseNum(offset)
        if (currentDecimal) {
          currentData = currentInteger
          offset = currentDecimal
        } else {
          currentData = offset
          offset = 0
        }
      }
    } else {
      currentData = 0
    }
    data[prop] = currentData
  }
}

function parseUpOffset(offset, dictList, data) {
  console.log('up', offset, ...dictList)
  for (let i = dictList.length - 1; i >= 0; i--) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = config.time.dict.data[prop]
      const rate = dict.rate.up
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
          // 此处理论值肯定为整数，避免精度丢失进行整数计算
          currentData = getNum(currentNumDecimal * rate, 'round', 0)
        }
      }
    } else {
      currentData = 0
    }
    data[prop] = currentData
  }
}

function getOffsetTime(offset, unit = 'sec', option = {}) {
  let startUnit = option.start || unit
  let endUnit = option.end || 'date'
  let data = {}
  offset = Number(offset)
  let startIndex = config.time.dict.list.indexOf(startUnit)
  let endIndex = config.time.dict.list.indexOf(endUnit)
  let currentIndex = config.time.dict.list.indexOf(unit)
  if (startIndex > currentIndex) {
    let [integer, decimal] = parseNum(offset)
    // down
    if (decimal) {
      offset = integer
      parseDownOffset(decimal, config.time.dict.list.slice(currentIndex + 1, startIndex + 1), data)
    }
  }
  // up
  parseUpOffset(offset, config.time.dict.list.slice(endIndex, currentIndex + 1), data)
  return data
}

export default getOffsetTime
