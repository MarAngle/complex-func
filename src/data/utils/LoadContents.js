import triggerFunc from './triggerFunc'

/**
 * 加载require contents
 * @param {*} contents
 * @param {function} fn
 */
function LoadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    triggerFunc(fn, contents(path), path, index)
  })
}

export default LoadContents
