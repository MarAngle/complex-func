import getType from './getType'

function deepCloneData(origindata, map = new Map()) {
  let type = getType(origindata)
  // 复杂对象进行递归
  if (type === 'object' || type === 'array') {
    let result = map.get(origindata)
    if (result) {
      return result
    } else {
      result = type === 'object' ? {} : []
      map.set(origindata, result)
      for (let key in origindata) {
        result[key] = deepCloneData(origindata[key], map)
      }
      return result
    }
  } else {
    return origindata
  }
}

export default deepCloneData