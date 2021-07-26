import { OBNAME } from './data/config'

const seenObjects = new Set()

function traverse(val) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}

function _traverse(val, seen) {
  let i, keys
  if (typeof val !== 'object') {
    return
  }
  if (val[OBNAME]) {
    const depId = val[OBNAME].dep.id
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  for (let n in val) {
    _traverse(val[n], seen)
  }
}

export default traverse
