import exportMsg from '../data/utils/exportMsg'

class Data {
  /**
   * 获取类实例名称
   * @returns {string}
   */
  $selfName() {
    return `${this.constructor.$name}`
  }
  /**
   * 创建输出信息
   * @param {string} content 需要输出的信息
   * @returns {string}
   */
  $createMsg (content) {
    return `${this.$selfName()}:${content}`
  }
  /**
   * 信息输出
   * @param {string} content 信息
   * @param {string} type 类型
   * @param {object} [option] 额外信息
   */
  $exportMsg(content, type = 'error', option) {
    exportMsg(this.$createMsg(content), type, option)
  }
  /**
   * toString方法改写
   * @returns {string}
   */
  toString() {
    return this.$selfName()
  }
}

Data.$name = 'Data'

export default Data
