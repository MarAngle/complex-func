
function getPropByList(targetData, propList) {
  let data = targetData
  propList = propList.filter(item => item && item.trim())
  for (let n = 0; n < propList.length; n++) {
    data = data[propList[n]]
    if (!data) {
      break
    }
  }
  return data
}

export default getPropByList
