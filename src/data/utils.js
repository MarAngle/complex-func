function LoadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    fn(contents(path), path, index)
  })
}

let utils = {}

const _data = require.context('./utils', false, /\.js$/)
LoadContents(_data, (item, path) => {
  let name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  if (!utils[name]) {
    utils[name] = item.default
  } else {
    console.error('auto mod load is repeat')
  }
})

export default utils
