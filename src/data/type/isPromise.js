/**
 * 是否是Promise对象
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Promise对象
 */
function isPromise(value) {
  return value && typeof value.then === 'function' && typeof value.catch === 'function'
}

export default isPromise
