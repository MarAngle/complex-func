import printMsg from './printMsg'

/**
 * 创建深度响应式数据,存在get/set时writable属性的设置不生效// 深度响应属性返回错误，等待后期修复
 * @param {object} data 目标对象
 * @param {string} key 属性
 * @param {*} val 属性值
 * @param {object} [option] 设置项
 * @param {object} [option.deep] 深度监控判断值
 * @param {object} [option.num] 深度层级
 * @param {object} [option.descriptor] 属性描述设置项
 * @param {boolean} [option.descriptor.configurable] 默认为真,当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
 * @param {boolean} [option.descriptor.enumerable] 默认为真,当且仅当指定对象的属性可以被枚举出时，为 true。
 * @param {Function} [option.get] 属性获取拦截器
 * @param {Function} [option.set] 属性设置拦截器
 * @returns {boolean} 是否设置成功
 */
function defineDeepReactive(data, key, val, option = {}) {
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
  let deep = option.deep || false
  let num = option.num || 0
  let buildChildSet
  delete option.deep
  if (deep) {
    let currentProp = option.currentProp || ''
    buildChildSet = function(obj) {
      if (typeof obj == 'object') {
        for (let n in obj) {
          num++
          let nextProp = currentProp ? currentProp + '.' + n : n
          console.log(obj, n, nextProp, num)
          defineDeepReactive(obj, n, obj[n], {
            deep: true,
            currentProp: nextProp,
            num: num,
            set: function(newValue, oldValue) {
              option.set(newValue, oldValue, nextProp, num)
            }
          })
        }
      }
    }
  }
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
          if (deep) {
            buildChildSet(newVal)
          }
          option.set(newVal, value)
        }
      }
    }
    // 存在getter和setter时需要通过setter将值修正为当前val的值
    const value = getter.call(data)
    if (val !== value) {
      descriptor.set(val)
    } else {
      if (deep) {
        buildChildSet(val)
      }
    }
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
          if (deep) {
            buildChildSet(newVal)
          }
          option.set(val, oldVal)
        }
      }
    }
    if (deep) {
      buildChildSet(val)
    }
  }
  Object.defineProperty(data, key, descriptor)
  return true
}

export default defineDeepReactive
