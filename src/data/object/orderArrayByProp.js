import getProp from './getProp'

/**
 * 根据rule数组顺序对list[index][prop]的值进行排序
 * @param {object[]} list 目标数组
 * @param {object} option 设置项
 * @param {string} option.prop 对比属性
 * @param {*[]} option.rule 设置项
 */
function orderArrayByProp(list, { prop, rule }) {
  for (let i = 0; i < rule.length; i++) {
    let ruleData = rule[i]
    for (let n = i; n < list.length; n++) {
      let item = list[n]
      if (getProp(item, prop) == ruleData) {
        // 当前位置删除并在需求位置添加上
        list.splice(n, 1)
        list.splice(i, 0, item)
        break
      }
    }
  }
}

export default orderArrayByProp
