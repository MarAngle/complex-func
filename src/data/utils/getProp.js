import getPropByList from './getPropByList'
/*
  根据'mainprop.prop'格式字符串获取对象值
  intervalRepeat作为分隔符的判断值
    =>为真时连续分隔符将会全部删除
    =>为否时则连续和开始结束分隔符保留
      =>此时.可作为属性
      =>.a将直接取.a属性,.a..b取[.a][.b]
      =>理论上无法进行[a.]属性的获取
*/
function getProp(targetData, prop, intervalRepeat = false) {
  if (!targetData || !prop) {
    return undefined
  } else {
    const interval = '.'
    let originPropList = prop.split(interval)
    let propList = []
    let lastEmpty = 0
    for (let n = 0; n < originPropList.length; n++) {
      let originProp = originPropList[n]
      if (originProp) {
        if (lastEmpty && !intervalRepeat) {
          originProp = interval.repeat(lastEmpty) + originProp
          lastEmpty = 0
        }
        propList.push(originProp)
      } else {
        lastEmpty++
      }
    }
    if (lastEmpty) {
      propList.push(interval.repeat(lastEmpty))
    }
    return getPropByList(targetData, propList)
  }
}

export default getProp
