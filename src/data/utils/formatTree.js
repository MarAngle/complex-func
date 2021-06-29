import formatTreeNext from './formatTreeNext'

function formatTree(originList, option = {}) {
  let idprop = option.id || 'id'
  let parentIdProp = option.parentId || 'parentId'
  let childrenProp = option.children || 'children'
  let dataCache = {}
  let mainlist = []
  for (let n in originList) {
    formatTreeNext(dataCache, originList[n], idprop, parentIdProp, childrenProp)
  }
  for (let n in dataCache) {
    if (!dataCache[n].isdata) {
      mainlist = mainlist.concat(dataCache[n].data[childrenProp])
    }
  }
  dataCache = null
  return mainlist
}

export default formatTree
