import localData from './option/localData'

/**
 * 获取本地缓存name全称
 * @param {string} name
 * @returns {string}
 */
function buildLocalDataName(name) {
  return localData.pre + name
}

export default buildLocalDataName
