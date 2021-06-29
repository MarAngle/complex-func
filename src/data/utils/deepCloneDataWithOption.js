import formatUpdateDataOption from './formatUpdateDataOption'
import updateDataWidthOptionNext from './updateDataWidthOptionNext'

function deepCloneDataWithOption(origindata, option) {
  option = formatUpdateDataOption(option, {})
  return updateDataWidthOptionNext(origindata, undefined, option)
}

export default deepCloneDataWithOption
