import getType from './../type/getType'
import downloadFileByAnchor from './downloadFileByAnchor'
import openWindow from './openWindow'

/**
 * 下载文件
 * @param {string | object} data
 * @returns {boolean} 是否成功
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
    if (downloadFileByAnchor(url, name)) {
      return true
    } else {
      openWindow(url)
      return true
    }
  } else {
    return false
  }
}

export default downloadFile
