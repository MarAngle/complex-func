import triggerFunc from './triggerFunc'

function LoadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    triggerFunc(fn, contents(path), path, index)
  })
}

export default LoadContents
