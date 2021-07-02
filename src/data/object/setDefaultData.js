import hasProp from './hasProp'

/**
 * 当value[prop]不存在时设置默认值defaultData，存在时不做操作，注意判断条件是存在属性而不是属性值为真
 * @param {object} value 对应值
 * @param {string} prop 属性
 * @param {*} defaultData 默认值
 */
function setDefaultData(value, prop, defaultData) {
  if (!hasProp(value, prop)) {
    value[prop] = defaultData
  }
}

export default setDefaultData
