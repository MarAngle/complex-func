import hasProp from './hasProp'

function setDefaultData(item, prop, defaultData) {
  if (!hasProp(item, prop)) {
    item[prop] = defaultData
  }
}

export default setDefaultData
