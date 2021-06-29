import getType from './getType'
import isComplex from './isComplex'

function checkComplex(data) {
  let type = getType(data)
  return isComplex(type)
}

export default checkComplex
