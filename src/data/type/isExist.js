import isSame from './isSame';

const defaultExistList = [false, 0]

/**
 * 值是否存在
 * @param {*} value 需要判断的数据
 * @param {*[]} [existList] 为否但是需要判断为存在的数组[false, 0]
 * @param {*[]} [unExistList] 为真但是需要判断为不存在的数组[]
 * @returns {boolean}
 */
function isExist(value, existList, unExistList) {
  if (value) {
    if (unExistList) {
      for (let i = 0; i < unExistList.length; i++) {
        const unExistItem = unExistList[i];
        if (isSame(unExistItem, value)) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }
  if (!existList) {
    existList = defaultExistList
  }
  return existList.indexOf(value) > -1
}

export default isExist
