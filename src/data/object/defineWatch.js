import printMsg from './../utils/printMsg'
import defineReactive from './defineReactive'

function defineWatch(obj, prop, option) {
  let optionType = typeof option
  if (optionType == 'function') {
    option = {
      handler: option
    }
  } else if (optionType != 'object') {
    printMsg(`defineWatch函数传参错误，option格式为:${optionType}`)
    return false
  }
  let reactiveOption = {
    set: function(val, oldVal) {
      option.handler(val, oldVal)
    }
  }
  return defineReactive(obj, prop, reactiveOption)
}

export default defineWatch
