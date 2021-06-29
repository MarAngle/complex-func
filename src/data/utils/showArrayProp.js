import getProp from './getProp'

function showArrayProp(list, prop) {
  let proplist = []
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    proplist.push(getProp(item, prop))
  }
  console.log(JSON.stringify(proplist))
}

export default showArrayProp
