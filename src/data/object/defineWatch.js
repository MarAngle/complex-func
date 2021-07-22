import printMsg from './../utils/printMsg'
import defineReactive from './defineReactive'

let deepIdCounter = 1

const deepIdProp = '$deepId_auto_prop$'

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
  let fg = defineReactive(obj, prop, reactiveOption)
  if (fg) {
    if (option.deep) {
      let deepId = option.deepId
      if (!deepId) {
        deepId = deepIdCounter
        deepIdCounter++
      }
      let value = obj[prop]
      let currentProp = option.currentProp
      if (typeof value === 'object') {
        value[deepIdProp] = deepId
        for (let key in value) {
          let nextProp = currentProp ? currentProp + '.' + key : key
          let nextOption = {
            deep: true,
            deepId: deepId,
            deepInside: true,
            currentProp: nextProp
          }
          if (!option.deepInside) {
            nextOption.handler = function(val, oldVal, currentProp) {
              option.handler(obj[prop], obj[prop], {
                prop: currentProp,
                val: val,
                oldVal: oldVal
              })
            }
          } else {
            nextOption.handler = function(val, oldVal) {
              option.handler(val, oldVal, nextProp)
            }
          }
          defineWatch(value, key, nextOption)
        }
      }
    }
    if (option.immediate) {
      option.handler(obj[prop], obj[prop])
    }
  }
  return fg
}

export default defineWatch
