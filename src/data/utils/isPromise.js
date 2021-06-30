/**
 * 是否是Promise对象
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Promise对象
 */
function isPromise(fn) {
  return fn && typeof fn.then === 'function' && typeof fn.catch === 'function'
}

export default isPromise
