
function isComplex(data) {
  let complex = ['object', 'array']
  return complex.indexOf(data) > -1
}

export default isComplex
