
function triggerFunc(func, ...args) {
  if (func && typeof func === 'function') {
    func(...args)
    return true
  } else {
    return false
  }
}

export default triggerFunc
