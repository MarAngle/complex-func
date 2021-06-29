import formatDataByType from './formatDataByType'
import setProp from './setProp'

function setPropByType(item, prop, data, type = 'string', useSetData) {
  let targetdata = formatDataByType(data, type)
  setProp(item, prop, targetdata, useSetData)
}

export default setPropByType
