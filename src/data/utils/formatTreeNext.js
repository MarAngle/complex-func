/*
1.不存在父节点则说明为根节点
2.存在父节点
  1.判断自己的数据是否已经模拟，创建或者赋值
  2.判断父节点是否存在，挂载上去
*/
/**
 * 格式化树形数组next操作
 * @param {object} dataCache 缓存
 * @param {object} originItem 源数据
 * @param {string} idProp id属性
 * @param {string} parentIdProp parentId属性
 * @param {string} childrenProp children属性
 */
function formatTreeNext(dataCache, originItem, idProp, parentIdProp, childrenProp) {
  let itemCache = dataCache[originItem[idProp]]
  // 存在值则说明此时存在虚拟构建的数据
  if (itemCache) {
    itemCache.isdata = true
    for (let n in originItem) {
      itemCache.data[n] = originItem[n]
    }
  } else {
    // 遍历到此时暂时未有该对象的子对象出现，因此直接实际构建数据
    originItem[childrenProp] = []
    itemCache = {
      isdata: true,
      data: originItem
    }
    dataCache[originItem[idProp]] = itemCache
  }
  let parentCache = dataCache[originItem[parentIdProp]]
  // 存在父节点则插入数据到父节点的列表中，此时不需要判断父节点的构建是否是虚拟构建
  if (parentCache) {
    parentCache.data[childrenProp].push(itemCache.data)
  } else {
    // 不存在父节点则虚拟构建父节点并直接赋值到列表中
    parentCache = {
      isdata: false, // 数据实际构建判断
      data: {
        [childrenProp]: [itemCache.data]
      }
    }
    dataCache[originItem[parentIdProp]] = parentCache
  }
}

export default formatTreeNext
