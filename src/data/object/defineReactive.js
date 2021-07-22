import printMsg from './../utils/printMsg'
import defineProperty from './defineProperty'

function defineReactive(obj, prop, option, val) {
  if (typeof obj != 'object') {
    printMsg('defineReactive中obj需要对象格式')
    return false
  }
  if (typeof option != 'object') {
    printMsg('defineReactive中option需要传递对象')
    return false
  }
  const currentDescriptor = Object.getOwnPropertyDescriptor(obj, prop)
  const getter = currentDescriptor && currentDescriptor.get
  const setter = currentDescriptor && currentDescriptor.set
  let descriptor = option.descriptor || {}
  if (getter && setter) {
    // 判断val是否传递，传递则进行赋值操作，此时不进行触发set回调
    if (arguments.length === 4) {
      setter.call(obj, val)
    }
    // getter/setter存在时
    descriptor.get = function() {
      const value = getter.call(obj)
      if (option.get) {
        option.get(value)
      }
      return value
    }
    descriptor.set = function(newVal) {
      const value = getter.call(obj)
      if (newVal !== value) {
        setter.call(obj, newVal)
        if (option.set) {
          option.set(newVal, value)
        }
      }
    }
  } else if (!getter && !setter) {
    // 判断val是否传递，为传递则取当前值作为缓存
    if (arguments.length === 3) {
      val = obj[prop]
    }
    descriptor.get = function() {
      if (option.get) {
        option.get(val)
      }
      return val
    }
    descriptor.set = function(newVal) {
      if (newVal !== val) {
        let oldVal = val
        val = newVal
        if (option.set) {
          option.set(val, oldVal)
        }
      }
    }
  } else {
    printMsg('defineReactive中obj的descriptor配置中getter和setter需要同时配置')
    return false
  }
  return defineProperty(obj, prop, descriptor)
}

export default defineReactive
