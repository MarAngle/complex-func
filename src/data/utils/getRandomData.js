import getRandomLetter from './getRandomLetter'

function getRandomData({ size, letter }) {
  let data = ''
  for (let n = 0; n < size; n++) {
    data = data + getRandomLetter(letter)
  }
  return data
}

export default getRandomData
