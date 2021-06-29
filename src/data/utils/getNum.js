
function getNum(originNum, type = 'round', radix = 2, NANZERO = true) { // 格式化数字
  let num = parseFloat(originNum)
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
