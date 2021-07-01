import setCanUse from './setCanUse'

/**
 * 检查全局函数是否可用
 * @param {*} Name 全局函数名
 * @param {*} prop 需要挂载的属性
 * @param {*} showError 是否显示错误信息
 */
function checkUseItem(Name, prop, showError) {
  try {
    if (window[Name]) {
      setCanUse(prop || Name, true)
    }
  } catch (e) {
    if (showError) {
      console.error(e)
    }
  }
}

export default checkUseItem
