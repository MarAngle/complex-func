import formatUpdateDataOption from './formatUpdateDataOption'
import updateDataWidthOptionNext from './updateDataWidthOptionNext'

function updateDataWidthOption(origindata, targetdata, option) {
  option = formatUpdateDataOption(option, {
    type: 'add'
  })
  return updateDataWidthOptionNext(origindata, targetdata, option)
}

export default updateDataWidthOption
