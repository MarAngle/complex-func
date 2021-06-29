import setData from './../../option/setData'

function setPropByList(targetData, propList, propData, useSetData) {
  let data = targetData
  for (let n = 0; n < propList.length; n++) {
    if (n < propList.length - 1) {
      if (!data[propList[n]]) {
        data[propList[n]] = {}
      }
      data = data[propList[n]]
    } else {
      if (!useSetData) {
        data[propList[n]] = propData
      } else {
        setData.set(data, propList[n], propData)
      }
    }
  }
}

export default setPropByList
