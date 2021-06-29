import printMsg from './printMsg'
import findTargetInStrNext from './findTargetInStrNext'

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
    printMsg('str/target参数不存在')
    return []
  }
}

export default findTargetInStr
