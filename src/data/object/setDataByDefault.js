import getType from '../type/getType'

function setObject(targetData, defaultData) {
  if (getType(targetData) !== 'object') {
    targetData = {}
  }
  for (let n in defaultData) {
    let type = getType(defaultData[n])
    if (type === 'object') {
      targetData[n] = setDataByDefault(targetData[n], defaultData[n])
    } else if (type === 'array') {
      targetData[n] = setArray(targetData[n], defaultData[n])
    } else if (targetData[n] === undefined) {
      targetData[n] = defaultData[n]
    }
  }
  return targetData
}

function setArray(targetData, defaultData) {
  if (getType(targetData) !== 'array') {
    targetData = []
  }
  for (let n in defaultData) {
    let type = getType(defaultData[n])
    if (type === 'object') {
      targetData[n] = setObject(targetData[n], defaultData[n])
    } else if (type === 'array') {
      targetData[n] = setArray(targetData[n], defaultData[n])
    } else if (targetData[n] === undefined) {
      targetData[n] = defaultData[n]
    }
  }
  return targetData
}

/**
 * 根据defaultData默认值设置targetData
 * @param {object} targetData 目标值
 * @param {object} defaultData 默认值
 * @returns {object}
 */
function setDataByDefault(targetData, defaultData = {}) {
  let type = getType(defaultData)
  if (type === 'object') {
    return setObject(targetData, defaultData)
  } else if (type === 'array') {
    return setArray(targetData, defaultData)
  } else {
    console.error('setDataByDefault函数运行错误，defaultData参数仅可接收对象和数组格式！')
    return targetData
  }
}

export default setDataByDefault
