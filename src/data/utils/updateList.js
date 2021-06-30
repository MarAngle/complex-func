import printMsg from './printMsg'
import getType from './getType'
import updateData from './updateData'

/**
 * 基于originlist更新targetlist列表数据
 * @param {*} targetlist 目标列表:需要进行更新的列表
 * @param {*} originlist 源数据列表:最新数据，以此为基准对目标列表数据进行更新
 * @param {object} option 设置项
 * @param {string | function} option.check 相同项检查,必传,string时作为prop取值对比,function时通过(targetItem, originItem)返回值对比
 * @param {boolean} [option.equal] option.check为string时,为真时则全等于判断
 * @param {'total' | 'clear'} [option.type] 更新类型,total合并更新,未命中数据不destroy,clear全复制,未命中数据destroy
 * @param {boolean} [option.push] 默认为真,新元素是否push的判断值,为否时新数据不会加入到targetlist
 * @param {object | function} [option.update] 更新数据的设置值,默认空对象,object模式下调用updateData进行更新,此为设置项,function模式下(targetItem, originItem)进行更新
 * @param {function} option.destroy 销毁函数,targetlist中需要删除的数据会调用此方法
 * @param {function} option.format 格式化函数,targetlist中需要push的数据会调用此方法
 * @returns
 */
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
