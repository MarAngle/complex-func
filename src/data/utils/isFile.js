
function isFile(data) {
  return Object.prototype.toString.call(data) === '[object File]'
}

export default isFile
