import printMsg from './../utils/printMsg'

/**
 * 创建响应式数据,存在get/set时writable属性的设置不生效
 * @param {object} data 目标对象
 * @param {string} key 属性
 * @param {*} val 属性值
 * @param {object} [option] 设置项
 * @param {object} [option.descriptor] 属性描述设置项
 * @param {boolean} [option.descriptor.configurable] 默认为真,当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
 * @param {boolean} [option.descriptor.enumerable] 默认为真,当且仅当指定对象的属性可以被枚举出时，为 true。
 * @param {Function} [option.get] 属性获取拦截器
 * @param {Function} [option.set] 属性设置拦截器
 * @returns {boolean} 是否设置成功
 */
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
