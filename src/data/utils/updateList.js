import printMsg from './printMsg'
import getType from './getType'
import updateData from './updateData'

function updateList(targetlist, originlist, option = {}) {
  // 生成check函数
  if (!option.check) {
    printMsg('请传递check函数判断相同对象')
    return
  } else {
    let type = getType(option.check)
    if (type !== 'function') {
      let checkOption = type === 'string' ? { prop: option.check } : option.check
      if (!checkOption.equal) {
        option.check = function(tItem, oItem) {
          return tItem[checkOption.prop] == oItem[checkOption.prop]
        }
      } else {
        option.check = function(tItem, oItem) {
          return tItem[checkOption.prop] === oItem[checkOption.prop]
        }
      }
    }
  }
  // 默认方法类型
  if (!option.type) {
    option.type = 'total'
  }
  // 默认方法类型
  if (option.push === undefined) {
    option.push = true
  }
  // 更新操作设置
  let updateType = 'option'
  if (!option.update) {
    option.update = {}
  } else {
    if (getType(option.update) == 'function') {
      updateType = 'function'
    }
  }
  // 复制数组数据避免对原数据的修改=>仅限于数组层面
  let cacheOriginList = originlist.slice()
  let cacheTargetPropList = []
  // 相同元素修改
  for (let index = 0; index < targetlist.length; index++) {
    let targetItem = targetlist[index]
    let isFind = false
    for (let i = 0; i < cacheOriginList.length; i++) {
      let originItem = cacheOriginList[i]
      if (option.check(targetItem, originItem)) {
        if (updateType == 'function') {
          option.update(targetItem, originItem)
        } else {
          updateData(targetItem, originItem, option.update)
        }
        cacheOriginList.splice(i, 1)
        isFind = true
        break
      }
    }
    if (!isFind) {
      cacheTargetPropList.push(index)
    }
  }
  // 旧元素删除判断 => 当存在未命中的index且type为total时，更新整个数据，删除未命中的数据
  if (cacheTargetPropList.length > 0 && option.type == 'total') {
    for (let n = cacheTargetPropList.length - 1; n >= 0; n--) {
      let index = cacheTargetPropList[n]
      let delList = targetlist.splice(index, 1)
      if (option.destroy) {
        option.destroy(delList[0])
      }
    }
  }
  // 新元素加入
  if (option.push && cacheOriginList.length > 0) {
    for (let k = 0; k < cacheOriginList.length; k++) {
      let originItem = cacheOriginList[k]
      if (option.format) {
        originItem = option.format(originItem)
      }
      targetlist.push(originItem)
    }
  }
}

export default updateList
