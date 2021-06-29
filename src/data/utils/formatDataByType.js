import getNum from './getNum'

function formatDataByType(originData, type = 'string') {
  let data
  if (type == 'boolean') {
    if (originData) {
      data = true
    } else {
      data = false
    }
  } else if (type == 'number') {
    data = getNum(originData, 'origin')
  } else {
    data = originData
  }
  return data
}

export default formatDataByType
