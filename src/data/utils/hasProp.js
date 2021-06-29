
function hasProp(data, prop) {
  if (data[prop] === undefined) {
    if (!Object.prototype.hasOwnProperty.call(data, prop)) {
      for (let n in data) {
        if (n == prop) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

export default hasProp
