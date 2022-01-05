import isOriginUrl from './isOriginUrl'

let checkAnchor = document.createElement('a')
let supportDownload = 'download' in checkAnchor
checkAnchor = null

/**
 * 基于a标签下载文件
 * @param {string} url
 * @param {string} name
 * @returns {boolean} 是否成功
 */
function downloadFileByAnchor(url, name = '', target) {
  if (supportDownload && isOriginUrl(url)) {
    let anchor = document.createElement('a')
    anchor.setAttribute('download', name)
    anchor.href = url
    if (target) {
      anchor.target = target
    }
    anchor.click()
    setTimeout(function() {
      anchor = null
    }, 100)
    return true
  } else {
    return false
  }
}

export default downloadFileByAnchor
