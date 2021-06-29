
function isBlob(data) {
  return Object.prototype.toString.call(data) === '[object Blob]'
}

export default isBlob
