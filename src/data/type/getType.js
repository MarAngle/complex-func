import isArray from './isArray'
import isFile from './isFile'
import isBlob from './isBlob'
import isRegExp from './isRegExp'
import isDate from './isDate'
import isSymbol from './isSymbol'

/**
 * value类型获取
 * @param {*} value 需要获取类型的值
 * @param {boolean} [complex] 在typeof基础上仅额外判断null/array
 * @returns {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "file" | "blob" | "regexp" | "date"}
 */
function getType(value, complex) {
  let type = typeof (value)
  if (type === 'object') {
    if (isArray(value)) {
      type = 'array'
    } else if (value === null) {
      type = 'null'
    } else if (complex) {
      if (isFile(value)) {
        type = 'file'
      } else if (isBlob(value)) {
        type = 'blob'
      } else if (isRegExp(value)) {
        type = 'regexp'
      } else if (isDate(value)) {
        type = 'date'
      } else if (isSymbol(value)) {
        type = 'symbol'
      }
    }
  }
  return type
}

export default getType
