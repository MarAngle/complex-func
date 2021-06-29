import buildLocalDataName from './buildLocalDataName'

function removeLocalData(name) {
  name = buildLocalDataName(name)
  localStorage.removeItem(name)
}

export default removeLocalData
