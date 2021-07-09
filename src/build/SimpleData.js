import printMsgAct from './../data/utils/printMsgAct'

class SimpleData {
  /**
   * 获取类实例名称
   * @returns {string}
   */
  _selfName() {
    return `${this.constructor.name}`
  }
  /**
   * 信息输出
   * @param {string} info 信息
   * @param {string} type 类型
   * @param {object} [option] 额外信息
   */
  printMsg(info, type = 'error', option) {
    printMsgAct(this._selfName() + ':' + info, type, option)
  }
  /**
   * toString方法改写
   * @returns {string}
   */
  toString() {
    return this._selfName()
  }
}

export default SimpleData
