import getTag from './getTag'

/**
 * 是否是Blob
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Blob
 */
function isBlob(value) {
  return getTag(value) === '[object Blob]'
}

export default isBlob
