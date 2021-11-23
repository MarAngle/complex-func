import exportSelfMsg from './../utils/exportSelfMsg'
import findTargetInStrNext from './findTargetInStrNext'

/**
 * 查找target在目标字符串中的位置数组
 * @param {string} str 目标字符串
 * @param {string} target 需要查找的字符串
 * @param {object} [option] 设置项
 * @param {boolean} option.case 是否忽略大小写,默认不忽略
 * @param {false | number} option.limitNum 限制数量,false不限制
 * @returns {number[]}
 */
function findTargetInStr(str, target, option = {}) {
  if (str && target) {
    str = str.toString()
    target = target.toString()
    let limitNum = option.limitNum || false
    if (option.case) {
      str = str.toUpperCase()
      target = target.toUpperCase()
    }
    return findTargetInStrNext(str, target, limitNum)
  } else {
    exportSelfMsg('str/target参数不存在')
    return []
  }
}

export default findTargetInStr
