function LoadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    fn(contents(path), path, index)
  })
}

const contents = require.context('./data', false, /(\.vue)|(\.js)$/)

LoadContents(contents, function(item) {
  let data = item.default || item
})
