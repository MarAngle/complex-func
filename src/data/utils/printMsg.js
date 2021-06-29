import printMsgAct from './printMsgAct'

function printMsg(msg = '', type = 'error', option) {
  let preMsg = `[complex-func]`
  printMsgAct(preMsg + msg, type, option)
}

export default printMsg
