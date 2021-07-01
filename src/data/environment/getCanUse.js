import option from './option/index'

/**
 * 判断prop是否可用
 * @param {string} prop
 * @returns {boolean}
 */
function getCanUse(prop) {
  return option.canUse[prop]
}

export default getCanUse
