import isSame from '../data/type/isSame'

function runText(fn, log) {
  try {
    fn(isSame)
  } catch (e) {
    console.error(e)
    if (log) {
      console.error(log)
    }
  }
}

export default runText
