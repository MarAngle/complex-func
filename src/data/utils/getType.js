import isArray from './isArray'
import isFile from './isFile'
import isBlob from './isBlob'
import isRegExp from './isRegExp'
import isDate from './isDate'

/**
 * value类型获取
 * @param {*} value 需要获取类型的值
 * @param {boolean} [simple] 在typeof基础上仅额外判断null
 * @returns {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "file" | "blob" | "regexp" | "date"}
 */
function getType(value, simple) {
  let type = typeof (value)
  if (type === 'object') {
    if (value === null) {
      type = 'null'
    } else if (!simple) {
      if (isArray(value)) {
        type = 'array'
      } else if (isFile(value)) {
        type = 'file'
      } else if (isBlob(value)) {
        type = 'blob'
      } else if (isRegExp(value)) {
        type = 'regexp'
      } else if (isDate(value)) {
        type = 'date'
      }
    }
  }
  return type
}

export default getType
