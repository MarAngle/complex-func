import getType from './getType'

/**
 * 判断值是否是空对象
 * @param {*} value 需要判断的值
 * @returns {boolean} value is EmptyObject
 */
function isEmptyArray(value, type) {
  if (!type) {
    type = getType(value)
  }
  if (type === 'array') {
    return value.length === 0
  } else {
    return false
  }
}

export default isEmptyArray
