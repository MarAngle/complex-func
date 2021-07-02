import RuleData from '../../build/RuleData'
import option from './option/index'

/**
 * 创建规则
 * @param {object} option RuleData initdata
 * @param {string} prop 规则保存属性,不存在不保存
 * @returns {RuleData}
 */
function buildRule(option, prop) {
  let ruleItem = new RuleData(option)
  if (prop) {
    option.data[prop] = ruleItem
  }
  return ruleItem
}

export default buildRule
