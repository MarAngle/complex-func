
function fillString(str, targetLength = 2, padString = '0', to = 'start', unDivision) {
  str = str.toString()
  padString = padString.toString()
  if (unDivision) {
    let repeatNum = Math.ceil((targetLength - str.length) / padString.length)
    if (repeatNum > 0) {
      targetLength = str.length + padString.length * repeatNum
    }
  }
  if (to == 'start') {
    str = str.padStart(targetLength, padString)
  } else if (to == 'end') {
    str = str.padEnd(targetLength, padString)
  }
  return str
}

export default fillString
