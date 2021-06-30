
/**
 * 获取指定字符串在目标字符串中的位置数组,理论上不单独调用
 * @param {string} str 目标字符串
 * @param {string} target 需要查找的字符串
 * @param {false | number} limitNum 限制数量,false不限制
 * @param {number[]} list index位置数组
 * @param {number} index 开始查找的坐标
 * @returns {number[]}
 */
function findTargetInStrNext(str, target, limitNum, list = [], index = 0) {
  let data = str.indexOf(target, index)
  if (data > -1) {
    list.push(data)
    if (limitNum === false || limitNum > list.length) {
      list = findTargetInStrNext(str, target, limitNum, list, data + target.length)
    }
  }
  return list
}

export default findTargetInStrNext
