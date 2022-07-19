import parseNum from './parseNum'

/**
 * 格式化高精度数字
 * @param {string | number} originNum 数据
 * @param {'origin' | 'round' | 'floor' | 'ceil'} type 格式化类型
 * @param {number} radix 保留小数点位数
 * @param {boolean} NANZERO NAN是否格式化为0
 * @returns {number}
 */
function getPreciseNum(originNum, type = 'round', radix = 2, NANZERO = true) {
  let [integer, decimal] = parseNum(originNum)
  if (isNaN(integer) || isNaN(decimal)) {
    if (NANZERO) {
      console.log('NAN is find')
      return 0
    } else {
      return NaN
    }
  } else {
    if (decimal) {
      let rate = Math.pow(10, radix)
      decimal = Math[type](decimal * rate) / rate
    }
    return integer + decimal
  }
}

export default getPreciseNum
