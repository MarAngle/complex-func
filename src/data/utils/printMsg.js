import printMsgAct from './printMsgAct'
/**
 * complex-func错误信息输出函数
 * @param {string} msg 错误信息提示
 * @param {'error' | 'warn' | 'log'} [type = error] 信息提示状态
 * @param {object} [option = {}] 设置项
 * @param {string} [option.data] 设置项
 * @param {'error' | 'warn' | 'log'} [option.type] 设置项
 */
function printMsg(msg = '', type = 'error', option) {
  let preMsg = `[complex-func]`
  printMsgAct(preMsg + msg, type, option)
}

export default printMsg
