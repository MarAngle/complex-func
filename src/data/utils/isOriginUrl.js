import parseUrl from './parseUrl'

let location = window.location

const propList = ['protocol', 'hostname', 'port']

/**
 * 判断2个URL是否同源
 * @param {string} url
 * @param {string} [otherUrl] 不存在时取当前url对应的location
 * @returns {boolean}
 */
function isOriginUrl(url, otherUrl) {
  let urlLocation = parseUrl(url)
  let otherUrlLocation
  if (otherUrl) {
    otherUrlLocation = parseUrl(otherUrl)
  } else {
    otherUrlLocation = location
  }
  for (let i = 0; i < propList.length; i++) {
    const prop = propList[i];
    if (urlLocation[prop] != otherUrlLocation[prop]) {
      return false
    }
  }
  return true
}

export default isOriginUrl
