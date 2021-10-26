
/**
 * 格式化list为tree数组
 * @param {object[]} originList 源数组
 * @param {object} [option] 格式化设置项
 * @param {string} [option.id] id属性,默认值id
 * @param {string} [option.parentId] parentId属性,默认值parentId
 * @param {string} [option.children] 树形接口的子列表属性,默认值children
 * @param {string} [option.type] 返回值类型，默认为list,map情况下将dataMap直接返回
 * @param {function} [option.format] 数据格式化函数
 * @returns 树形数组
 */
function formatTree(originList, option = {}) {
  // 配置参数获取
  const idProp = option.id || 'id'
  const parentIdProp = option.parentId || 'parentId'
  const childrenProp = option.children || 'children'
  const type = option.type || 'list'
  const format = option.format
  // 缓存对象
  let dataMap = {}
  // 树形数组
  let treeList = []
  for (let n = 0; n < originList.length; n++) {
    let originItem = originList[n]
    const id = originItem[idProp]
    const parentId = originItem[parentIdProp]
    let mapItem = dataMap[id]
    // 存在值则说明此时存在虚拟构建的数据
    if (mapItem) {
      mapItem.isFormat = true
      if (!format) {
        for (let n in originItem) {
          mapItem.data[n] = originItem[n]
        }
      } else {
        format(mapItem.data, originItem)
      }
    } else {
      if (!format) {
        mapItem = {
          isFormat: true,
          data: originItem
        }
      } else {
        mapItem = {
          isFormat: true,
          data: {}
        }
        format(mapItem.data, originItem)
      }
      dataMap[id] = mapItem
    }
    let parentMapItem = dataMap[parentId]
    // 存在父节点则插入数据到父节点的列表中，此时不需要判断父节点的构建是否是虚拟构建
    if (!parentMapItem) {
      // 不存在父节点则虚拟构建父节点
      parentMapItem = {
        isFormat: false, // 数据实际构建判断
        data: {
          [childrenProp]: []
        }
      }
      dataMap[parentId] = parentMapItem
    }
    if (!parentMapItem.data[childrenProp]) {
      parentMapItem.data[childrenProp] = []
    }
    parentMapItem.data[childrenProp].push(mapItem.data)
  }
  if (type == 'list') {
    for (let n in dataMap) {
      // 将虚拟构建的列表合并，此逻辑按照不存在父元素的值为根元素
      if (!dataMap[n].isFormat) {
        treeList = treeList.concat(dataMap[n].data[childrenProp])
      }
    }
    dataMap = null
    return treeList
  } else {
    return dataMap
  }
}

export default formatTree
