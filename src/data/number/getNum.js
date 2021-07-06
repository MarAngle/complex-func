
/**
 * 格式化数字
 * @param {string | number} originNum 数据
 * @param {'origin' | 'round' | 'floor' | 'ceil'} type 格式化类型
 * @param {number} radix 小数点几位
 * @param {boolean} NANZERO NAN是否格式化为0
 * @returns {number}
 */
function getNum(originNum, type = 'round', radix = 2, NANZERO = true) {
  let num = typeof originNum === 'number' ? originNum : parseFloat(originNum)
  if (isNaN(num)) {
    if (NANZERO) {
      num = 0
      console.log('NAN is find')
    }
  } else if (type != 'origin' && Math.round(num) !== num) { // 如果是小数
    let rate = Math.pow(10, radix)
    num = Math[type](num * rate) / rate
  }
  return num
}

export default getNum
