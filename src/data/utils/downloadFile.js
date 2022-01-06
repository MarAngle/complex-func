import getType from './../type/getType'
import downloadFileByAnchor from './downloadFileByAnchor'

/**
 * 下载文件
 * @param {string | object} data
 * @returns {boolean | Window | null} 是否成功
 */
function downloadFile(data) {
  if (data) {
    let url, name
    let type = getType(data)
    if (type == 'string') {
      url = data
    } else {
      url = data.url
      name = data.name
    }
    return downloadFileByAnchor(url, name)
  } else {
    return false
  }
}

export default downloadFile
