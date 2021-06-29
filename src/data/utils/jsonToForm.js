import getType from './getType'

function jsonToForm(jsonData) {
  let formData = new FormData()
  for (let prop in jsonData) {
    let type = getType(jsonData[prop])
    if (type === 'object') {
      formData.append(prop, jsonToForm(jsonData[prop]))
    } else {
      formData.append(prop, jsonData[prop])
    }
  }
  return formData
}

export default jsonToForm
