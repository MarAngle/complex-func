import config from '../../../config'
import getType from '../type/getType'
import fillString from '../string/fillString'

function transformTime(data, option, showFormat) {
  let format, current
  let type = getType(option)
  if (type === 'string') {
    format = option
  } else if (type === 'object') {
    format = option.format
    current = option.current
  }
  if (!format) {
    format = config.time.format.default
  }
  let currentDate
  let dateStr = showFormat
  for (let i = 0; i < config.time.dict.list.length; i++) {
    const prop = config.time.dict.list[i]
    const dict = config.time.dict.data[prop]
    const showIndex = showFormat.indexOf(dict.code)
    if (showIndex > -1) {
      const index = format.indexOf(dict.code)
      let num
      if (index > -1) {
        num = data.substring(index, index + dict.code.length)
      } else {
        if (current || dict.default === undefined) {
          if (!currentDate) {
            currentDate = new Date()
          }
          num = currentDate[dict.func]() + dict.offset
        } else {
          num = dict.default
        }
      }
      dateStr = dateStr.replace(dict.code, fillString(num, dict.code.length))
    }
  }
  return dateStr
}

export default transformTime
