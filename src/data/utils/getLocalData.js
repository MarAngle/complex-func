import buildLocalDataName from './buildLocalDataName'
import setLocalData from './setLocalData'

function getLocalData(name, time, refresh) {
  name = buildLocalDataName(name)
  let localData = localStorage.getItem(name)
  if (localData) {
    localData = JSON.parse(localData)
    if (time) {
      let currentTime = Date.now()
      time = time * 1000
      if ((currentTime - localData.time) > time) {
        localData.value = null
      }
    }
    if (refresh) {
      setLocalData(name, localData.value)
    }
    return localData.value
  } else {
    return undefined
  }
}

export default getLocalData
