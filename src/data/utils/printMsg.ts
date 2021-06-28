import printMsgAct from './printMsgAct'

function printMsg(msg: string | Error, type:'log' | 'warn' | 'error', option: undefined | {
  type?: string,
  data?: string
}) {
  let preMsg = `[complex-func]`
  printMsgAct(preMsg + msg, type, option)
}

export default printMsg
