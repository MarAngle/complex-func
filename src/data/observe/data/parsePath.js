import getProp from '../../object/getProp'

function parsePath(prop) {
  return (obj) => {
    return getProp(obj, prop)
  }
}

export default parsePath
