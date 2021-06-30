
/**
 * 根据属性列表获取对象属性
 * @param {object} value 对应对象
 * @param {string[]} propList 属性列表
 * @returns
 */
function getPropByList(value, propList) {
  let data = value
  propList = propList.filter(item => item && item.trim())
  for (let n = 0; n < propList.length; n++) {
    data = data[propList[n]]
    if (!data) {
      break
    }
  }
  return data
}

export default getPropByList
