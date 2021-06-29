
function appendProp(data, propName, propData, type = 'json') {
  if (type == 'json') {
    data[propName] = propData
  } else if (type == 'formdata') {
    data.append(propName, propData)
  }
}

export default appendProp
