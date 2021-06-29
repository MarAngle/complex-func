
function isPromise(fn) {
  return fn && typeof fn.then === 'function' && typeof fn.catch === 'function'
}

export default isPromise
