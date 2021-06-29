import isArray from './isArray'
import isFile from './isFile'
import isBlob from './isBlob'

function getType(data, simple) {
  let type = typeof (data)
  if (type === 'object') {
    if (data === null) {
      type = 'null'
    } else if (!simple) {
      if (isArray(data)) {
        type = 'array'
      } else if (isFile(data)) {
        type = 'file'
      } else if (isBlob(data)) {
        type = 'blob'
      } else if (data instanceof RegExp) {
        type = 'regexp'
      } else if (data instanceof Date) {
        type = 'date'
      }
    }
  }
  return type
}

export default getType
