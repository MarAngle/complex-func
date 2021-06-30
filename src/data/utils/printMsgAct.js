/**
 * 错误信息输出函数
 * @param {string | Error} msg 错误信息提示
 * @param {'error' | 'warn' | 'log'} [type = error] 信息提示状态
 * @param {object} [option = {}] 设置项
 * @param {string} [option.data] 设置项
 * @param {'error' | 'warn' | 'log'} [option.type] 设置项
 */
function printMsgAct(msg, type = 'error', option = {}) {
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
