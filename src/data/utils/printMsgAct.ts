import isError from './isError'

function printMsgAct(msg: string | Error, type:'log' | 'warn' | 'error' = 'error', option: undefined | {
  type?: string,
  data?: string
}) {
  if (type == 'error') {
    if (!isError(msg)) {
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
