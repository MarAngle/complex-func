import isSymbol from '../type/isSymbol'

/**
 * 数字转换
 * @param {string | number} originNum 数据
 * @returns {number}
 */
 function formatNum(value) {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return Number.NaN
  }
  return Number(value)
}

export default formatNum
