
function isArray(data) {
  if (Array.isArray) {
    return Array.isArray(data)
  } else {
    return Object.prototype.toString.call(data) === '[object Array]'
  }
}

export default isArray
