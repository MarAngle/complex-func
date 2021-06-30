import getType from './getType'

/**
 * 判断值是否是空对象
 * @param {*} value 需要判断的值
 * @returns {boolean} value is EmptyObject
 */
function isEmptyObject(value) {
  if (getType(value) === 'object') {
    for (let n in value) {
      return false
    }
    return true
  } else {
    return false
  }
}

export default isEmptyObject
