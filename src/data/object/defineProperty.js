import printMsg from './../utils/printMsg'

function defineProperty(obj, prop, descriptor) {
  if (typeof obj != 'object') {
    printMsg('defineProperty中obj需要对象格式')
    return false
  }
  if (typeof descriptor != 'object') {
    printMsg('defineProperty中descriptor需要传递descriptor对象')
    return false
  }
  if (descriptor.configurable === undefined) {
    descriptor.configurable = true
  }
  if (descriptor.enumerable === undefined) {
    descriptor.enumerable = true
  }
  Object.defineProperty(obj, prop, descriptor)
  return true
}

export default defineProperty
