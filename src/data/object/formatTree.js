import formatTreeNext from './formatTreeNext'

/**
 * 格式化list为tree数组
 * @param {object[]} originList 源数组
 * @param {object} [option] 格式化设置项
 * @param {string} [option.id] id属性,默认值id
 * @param {string} [option.parentId] parentId属性,默认值parentId
 * @param {string} [option.children] 树形接口的子列表属性,默认值children
 * @returns 树形数组
 */
function formatTree(originList, option = {}) {
  let idprop = option.id || 'id'
  let parentIdProp = option.parentId || 'parentId'
  let childrenProp = option.children || 'children'
  let dataCache = {}
  let treelist = []
  for (let n in originList) {
    formatTreeNext(dataCache, originList[n], idprop, parentIdProp, childrenProp)
  }
  for (let n in dataCache) {
    if (!dataCache[n].isdata) {
      treelist = treelist.concat(dataCache[n].data[childrenProp])
    }
  }
  dataCache = null
  return treelist
}

export default formatTree
