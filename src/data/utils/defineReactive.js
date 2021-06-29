import printMsg from './printMsg'

// 创建响应式数据
// 存在get/set时writable属性的设置不生效
function defineReactive(data, key, val, option = {}) {
  const property = Object.getOwnPropertyDescriptor(data, key)
  if (property && property.configurable === false) {
    printMsg('defineReactive时data配置中configurable不能为false')
    return false
  }
  const getter = property && property.get
  const setter = property && property.set
  if ((getter && !setter) || (!getter && setter)) {
    printMsg('defineReactive时data配置中getter和setter需要同时配置')
    return false
  }
  let descriptor = option.descriptor || {}
  if (descriptor.configurable === undefined) {
    descriptor.configurable = true
  }
  if (descriptor.enumerable === undefined) {
    descriptor.enumerable = true
  }
  // 这里判断提前，减少内部操作的判断
  if (getter) {
    // getter/setter存在时
    descriptor.get = function() {
      const value = getter.call(data)
      if (option.get) {
        option.get(value)
      }
      return value
    }
    descriptor.set = function(newVal) {
      const value = getter.call(data)
      if (newVal !== value) {
        setter.call(data, newVal)
        if (option.set) {
          option.set(newVal, value)
        }
      }
    }
    // 存在getter和setter时需要通过setter将值修正为当前val的值
    descriptor.set(val)
  } else {
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
  }
  Object.defineProperty(data, key, descriptor)
  return true
}

export default defineReactive
