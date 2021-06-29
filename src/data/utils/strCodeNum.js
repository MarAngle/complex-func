
function strCodeNum(str) {
  let num = 0
  for (let n = 0; n < str.length; n++) {
    num = num + str.charCodeAt(n)
  }
  return num
}

export default strCodeNum
