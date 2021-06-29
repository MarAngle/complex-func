
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
