import config from '../../../config'
import fillString from '../string/fillString'
import getType from './../type/getType'
import getOffsetTime from './getOffsetTime'

function offsetTimeFormat(offsetTime, start, end, option = {}) {
  let startShow = option.startShow
  let endShow = option.endShow === undefined ? true : option.endShow
  let middleShow = option.middleShow === undefined ? true : option.middleShow
  let fixed = option.fixed
  let mainDict = option.dict
  let isStart = true
  let str = ''
  for (let i = end; i <= start; i++) {
    const prop = config.time.dict.list[i]
    let fg = false
    /**
     * 存在值则构建
     * 不存在值进行以下判断
     * 处于开始阶段且startShow时构建
     * startShow额外判断:当处于结束阶段且endShow时，此时全部为0，构建end
     * 处于非开始阶段且middleShow时构建
     */
    let data = offsetTime[prop] || 0
    if (data) {
      fg = true
      isStart = false
    } else if (isStart) {
      if (startShow || (i === start && endShow)) {
        fg = true
      }
    } else if (middleShow) {
      fg = true
    }
    if (fg) {
      let unit, currentStr
      if (mainDict) {
        if (!fixed) {
          unit = mainDict[prop]
          data = data.toString()
        } else {
          unit = mainDict[prop].unit
          data = fillString(data, mainDict[prop].unit.fixed)
        }
      } else {
        const dict = config.time.dict.data[prop]
        unit = dict.name
        if (!fixed) {
          data = data.toString()
        } else {
          data = fillString(data, dict.code.length)
        }
      }
      currentStr = data + unit
      str += currentStr
    }
  }
  return str
}

function getOffsetTimeStr(offset, unit, option = {}) {
  option.complex = true
  let offsetTime = getOffsetTime(offset, unit, option)
  let format = option.format
  let type = getType(format)
  if (type !== 'function') {
    return offsetTimeFormat(offsetTime.data, offsetTime.start, offsetTime.end, format)
  } else {
    return format(offsetTime.data)
  }
}

export default getOffsetTimeStr
