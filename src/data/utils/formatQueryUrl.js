import encodeURI from './encodeURI'

function formatQueryUrl(url, data) {
  let type = 'init'
  if (url.indexOf('?') > -1) {
    type = 'extra'
  }
  if (type == 'init') {
    url += '?'
  } else if (type == 'extra') {
    url += '&'
  }
  for (let n in data) {
    url = url + n + '=' + encodeURI(data[n])
    url += '&'
  }
  return url.substring(0, url.length - 1)
}

export default formatQueryUrl
