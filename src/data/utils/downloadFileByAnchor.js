
/**
 * 基于a标签下载文件
 * @param {string} url
 * @param {string} name
 * @returns {boolean} 是否成功
 */
function downloadFileByAnchor(url, name = '', target = '_blank') {
  let anchor = document.createElement('a')
  if ('download' in anchor) {
    anchor.setAttribute('download', name)
    anchor.href = url
    anchor.target = target
    anchor.click()
    setTimeout(function() {
      anchor = null
    }, 1000)
    return true
  } else {
    return false
  }
}

export default downloadFileByAnchor
