import isSame from '../data/type/isSame'

function showError(error) {
  throw new Error(error)
}
function checkSame(value, other, error) {
  if (!isSame(value, other)) {
    showError(error)
  }
}

function runText(fn, log) {
  try {
    fn({
      checkSame,
      showError
    })
  } catch (e) {
    console.error(e)
    if (log) {
      console.error(log)
    }
  }
}

export default runText
