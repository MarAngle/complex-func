import getLimitData from './getLimitData'

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
  }
  // 深度设置项,为否不包括0时不限制深度,数组本身也是深度
  if (!option.depth && option.depth !== 0) {
    option.depth = true
  }
  return option
}

export default formatUpdateDataOption
