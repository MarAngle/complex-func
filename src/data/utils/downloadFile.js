import getType from './getType'
import downloadFileByAnchor from './downloadFileByAnchor'
import openWindow from './openWindow'

function downloadFile(data) {
  if (data) {
    let type = getType(data)
    if (type == 'string') {
      data = {
        url: data
      }
    }
    if (!data.name) {
      data.name = ''
    }
    if (downloadFileByAnchor(data.url, data.name)) {
      return true
    } else {
      openWindow(data.url)
      return true
    }
  } else {
    return false
  }
}

export default downloadFile
