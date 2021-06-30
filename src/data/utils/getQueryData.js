import getQueryUrl from './getQueryUrl'

/**
 * 解析query数据（#此处不做判断）
 * @param {string} url
 * @returns {object}
 */
function getQueryData(url) {
  let queryData = {}
  let queryUrl = getQueryUrl(url)
  if (queryUrl) {
    let queryList = queryUrl.split('&')
    for (let n in queryList) {
      let oitem = queryList[n]
      if (oitem) {
        oitem = oitem.split('=')
        queryData[oitem[0]] = oitem[1]
      }
    }
  }
  return queryData
}

export default getQueryData
