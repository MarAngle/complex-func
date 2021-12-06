import exportMsg from './../data/utils/exportMsg'

class SimpleData {
  /**
   * 获取类实例名称
   * @returns {string}
   */
  $selfName() {
    return `${this.constructor.name}`
  }
  /**
   * 信息输出
   * @param {string} info 信息
   * @param {string} type 类型
   * @param {object} [option] 额外信息
   */
  $exportMsg(info, type = 'error', option) {
    exportMsg(this.$selfName() + ':' + info, type, option)
  }
  /**
   * toString方法改写
   * @returns {string}
   */
  toString() {
    return this.$selfName()
  }
}

export default SimpleData
