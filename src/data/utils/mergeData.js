import getType from './getType'

function mergeData(targetData, originData) {
  if (!originData) {
    originData = {}
  }
  for (let n in originData) {
    let type = getType(originData[n])
    if (type == 'object') {
      if (!targetData[n]) {
        targetData[n] = {}
      }
      mergeData(targetData[n], originData[n])
    } else {
      targetData[n] = originData[n]
    }
  }
  return targetData
}

export default mergeData
