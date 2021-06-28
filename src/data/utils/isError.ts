
function isError(data:any): data is Error {
  return Object.prototype.toString.call(data) === '[object Error]'
}

export default isError
