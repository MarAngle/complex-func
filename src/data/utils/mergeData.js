import getType from './getType'

/**
 * 合并数据函数，基于源数据originData格式化目标数据targetData函数
 * @param {*} targetData 目标数据
 * @param {object} originData 源数据
 * @returns targetdata
 */
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
