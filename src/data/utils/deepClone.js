import deepCloneData from './deepCloneData'
import deepCloneDataWithOption from './deepCloneDataWithOption'

function deepClone(origindata, option) {
  if (!option) {
    return JSON.parse(JSON.stringify(origindata))
  } else if (option === true) {
    return deepCloneData(origindata)
  } else {
    return deepCloneDataWithOption(origindata, option)
  }
}

export default deepClone
