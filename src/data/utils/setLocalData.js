import buildLocalDataName from './buildLocalDataName'

/**
 * 设置缓存
 * @param {string} name
 * @param {*} value
 */
function setLocalData(name, value) {
  name = buildLocalDataName(name)
  let localData = {
    value: value,
    time: Date.now()
  }
  localStorage.setItem(name, JSON.stringify(localData))
}

export default setLocalData
