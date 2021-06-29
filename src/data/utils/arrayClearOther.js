
function arrayClearOther(list, index, startIndex = 0) {
  if (list.length - 1 >= index) {
    // 删除index + 1到结束
    let endIndex = index + 1
    if (endIndex < startIndex) {
      endIndex = startIndex
    }
    let endNum = list.length - endIndex
    list.splice(endIndex, endNum)
    // 删除开始到index - 1
    let startNum = index - startIndex
    if (startNum > 0) {
      list.splice(startIndex, startNum)
    }
  }
}

export default arrayClearOther
