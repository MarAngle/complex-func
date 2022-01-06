
/**
 * 根据属性列表获取对象属性
 * @param {object} value 对应对象
 * @param {string[]} propList 属性列表
 * @returns
 */
function getPropByList(value, propList) {
  let data = value
  try {
    for (let n = 0; n < propList.length; n++) {
      let prop = propList[n]
      if (prop || prop === 0) {
        data = data[prop]
      }
    }
    return data
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export default getPropByList
