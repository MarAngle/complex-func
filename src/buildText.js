function loadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    fn(contents(path), path, index)
  })
}

// -----
let importurl = ''
let exportlist = ''

const _data = require.context('./data/utils', false, /\.js$/)
let maindata = {}
function LoadProp (data, contents) {
  loadContents(contents, function(item, path) {
    let name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    if (!data[name]) {
      data[name] = item.default
    } else {
      console.error('auto mod load is repeat')
    }
  })
}
function countProp (data, url) {
  if (importurl) {
    importurl += `
`
exportlist += `
`
  }
  for (let n in data) {
    exportlist = exportlist + `
  ${n},`
    importurl = importurl + `
import ${n} from './${url}/${n}'`
  }
}
LoadProp(maindata, _data)
countProp(maindata, 'data/utils')

console.log(importurl)
console.log(exportlist)
// -----
