import updateDataWidthOption from './updateDataWidthOption'

function updateData(targetdata, origindata, option = {}) {
  if (!option.type) {
    option.type = 'add'
  }
  targetdata = updateDataWidthOption(origindata, targetdata, option)
  return targetdata
}

export default updateData
