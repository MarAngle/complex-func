
function printMsgAct(msg = '', type = 'error', option = {}) {
  if (type == 'error') {
    if (!this.isError(msg)) {
      console[type](new Error(msg))
    } else {
      console[type](msg)
    }
  } else {
    console[type](msg)
  }
  if (option.data) {
    if (!option.type) {
      option.type = type
    }
    console[option.type](option.data)
  }
}

export default printMsgAct
