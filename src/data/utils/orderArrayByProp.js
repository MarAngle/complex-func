import getProp from './getProp'

function orderArrayByProp(list, { prop, rule }) {
  for (let i = 0; i < rule.length; i++) {
    let ruleProp = rule[i]
    for (let n = i; n < list.length; n++) {
      let item = list[n]
      if (getProp(item, prop) == ruleProp) {
        // 当前位置删除并在需求位置添加上
        list.splice(n, 1)
        list.splice(i, 0, item)
        break
      }
    }
  }
}

export default orderArrayByProp
