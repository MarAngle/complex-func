
function choiceProp(list, prop, target = false, item, itemTarget = true) {
  for (let n in list) {
    list[n][prop] = target
  }
  if (item) {
    item[prop] = itemTarget
  }
}

export default choiceProp
