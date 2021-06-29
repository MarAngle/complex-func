import printMsg from './printMsg'
import defineReactive from './defineReactive'

function defineWatch(data, key, option = {}) {
  let type = typeof data
  if (type !== 'object') {
    printMsg('defineWatch中data只能接收object')
    return false
  }
  if (!key) {
    printMsg('defineWatch中需要传递key')
    return false
  }
  if (!option.get && !option.set) {
    printMsg('defineWatch中需要传递get/set')
    return false
  }
  return defineReactive(data, key, data[key], option)
}

export default defineWatch