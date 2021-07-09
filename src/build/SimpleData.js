import printMsgAct from './../data/utils/printMsgAct'

class SimpleData {
  _selfName() {
    return `${this.constructor.name}`
  }
  printMsg(info, type = 'error', option) {
    printMsgAct(this._selfName() + ':' + info, type, option)
  }
  toString() {
    return this._selfName()
  }
}

export default SimpleData
