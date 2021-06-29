
function isError(data) {
  return Object.prototype.toString.call(data) === '[object Error]'
}

export default isError
