import getType from './getType'

// 清除开始结束空格，仅对字符串有效
function trimData(data) {
  let type = getType(data)
  if (type == 'string') {
    data = data.trim()
  }
  return data
}

export default trimData
