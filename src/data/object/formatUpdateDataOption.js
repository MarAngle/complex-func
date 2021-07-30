import getLimitData from './../utils/getLimitData'

/**
 * 格式化UpdateOption,updateDataWidthOption函数的设置项
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} [option.reset] 全更新/附加更新判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @param {*} defaultOption 默认值
 * @returns {object}
 */
function formatUpdateDataOption(option, defaultOption = {}) {
  // 初始化设置项
  if (typeof option !== 'object') {
    option = {}
  }
  // 格式化类型
  if (!option.type) {
    option.type = defaultOption.type ? defaultOption.type : 'total'
  }
  // 格式化类型
  if (option.reset === undefined) {
    option.reset = defaultOption.reset !== undefined ? defaultOption.reset : true
  }
  // 限制字段设置
  if (!option.limitData) {
    option.limitData = getLimitData(option.limit)
    if (option.limit) {
      delete option.limit
    }
  }
  // 深度设置项,为否不包括0时不限制深度,数组本身也是深度
  if (!option.depth && option.depth !== 0) {
    option.depth = true
  }
  return option
}

export default formatUpdateDataOption
