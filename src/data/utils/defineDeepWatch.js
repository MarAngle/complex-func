import printMsg from './printMsg'
import defineDeepReactive from './defineDeepReactive'

/**
 * 创建深度响应式数据,存在get/set时writable属性的设置不生效// 深度响应属性返回错误，等待后期修复
 * @param {object} data 目标对象
 * @param {string} key 属性
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
function defineDeepWatch(data, key, option = {}) {
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
  return defineDeepReactive(data, key, data[key], option)
}

export default defineDeepWatch
