import downloadFileByAnchor from './downloadFileByAnchor'
import openWindow from './openWindow'

/**
 * 下载blob文件
 * @param {*} blobValue
 * @param {string} type
 * @param {string} [name]
 * @returns {boolean} 是否成功
 */
function downloadBlob(blobValue, type, name = '') {
  let blob
  if (typeof window.Blob == 'function') {
    blob = new Blob([blobValue], { type: type })
  } else {
    let BlobBuilder = window.MSBlobBuilder
    let blobData = new BlobBuilder()
    blobData.append(blobValue)
    blob = blobData.getBlob(type)
  }
  let URL = window.URL || window.webkitURL
  let blobUrl = URL.createObjectURL(blob)
  if (downloadFileByAnchor(blobUrl, name)) {
    return true
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name)
    return true
  } else {
    openWindow(blobUrl)
    return true
  }
}

export default downloadBlob
