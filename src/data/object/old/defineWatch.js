import printMsg from './../utils/printMsg'
import defineReactive from './defineReactive'

/**
 * 监控对象属性
 * @param {*} data 监控对象
 * @param {*} key 监控属性
 * @param {object} [option] 设置项
 * @param {object} [option.descriptor] 属性描述设置项
 * @param {boolean} [option.descriptor.configurable] 默认为真,当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
 * @param {boolean} [option.descriptor.enumerable] 默认为真,当且仅当指定对象的属性可以被枚举出时，为 true。
 * @param {Function} [option.get] 属性获取拦截器
 * @param {Function} [option.set] 属性设置拦截器
 * @returns {boolean} 设置是否成功
 */
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
