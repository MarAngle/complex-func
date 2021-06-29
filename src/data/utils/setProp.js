import setPropByList from './setPropByList'

function setProp(targetData, prop, propData, useSetData) {
  if (!targetData || !prop) {
    return false
  } else {
    let propList = prop != '.' ? prop.split('.') : [prop]
    setPropByList(targetData, propList, propData, useSetData)
    return true
  }
}

export default setProp
