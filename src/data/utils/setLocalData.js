import buildLocalDataName from './buildLocalDataName'

function setLocalData(name, value) {
  name = buildLocalDataName(name)
  let localData = {
    value: value,
    time: Date.now()
  }
  localStorage.setItem(name, JSON.stringify(localData))
}

export default setLocalData
