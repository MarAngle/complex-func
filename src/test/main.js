
function runText(fn, log) {
  try {
    fn()
  } catch (e) {
    console.error(e)
    if (log) {
      console.error(log)
    }
  }
}

export default runText
