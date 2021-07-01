import option from './option/index'

/**
 * 设置全局属性是否可用
 * @param {string} prop 属性
 * @param {boolean} data 可用
 */
function setCanUse(prop, data) {
  option.canUse[prop] = data
}

export default setCanUse
