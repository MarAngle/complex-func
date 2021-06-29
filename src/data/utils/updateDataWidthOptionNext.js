import getType from './getType'

function updateDataWidthOptionNext(origindata, targetdata, option = {}, currentnum = 1, currentprop = '', map = new Map()) {
  let type = getType(origindata)
  // 复杂对象进行递归
  if (type == 'object' || type == 'array') {
    let unDeep = true
    let reset = false
    // 检查当前depth
    if (option.depth === true || currentnum <= option.depth) {
      // 初始化目标值
      let targetType = getType(targetdata)
      if (targetType === type) {
        /*
          类型相同时进行深拷贝循环
          类型不同时，全复制模式和附加模式，都无法将以前的数据作为基准，因此直接进行赋值操作，不进行深拷贝循环
          ！此时可能会出现赋值数据中的限制字段无效的情况发生
        */
        unDeep = false
      } else if (option.reset) {
        // 类型不同时，reset为真则进行循环模式
        unDeep = false
        // 设置重置操作
        reset = true
      }
    }
    if (unDeep) {
      targetdata = origindata
    } else {
      // 循环引用判断
      let cachedata = map.get(origindata)
      if (cachedata) {
        targetdata = cachedata
      } else {
        // 此时进行深拷贝循环
        currentnum++
        if (reset) {
          targetdata = type === 'object' ? {} : []
        }
        map.set(origindata, targetdata)
        for (let key in origindata) {
          let nextprop = currentprop ? currentprop + '.' + key : key
          // 判断下一级的属性是否存在赋值限制，被限制的不进行赋值操作
          if (!option.limitData.getLimit(nextprop)) {
            targetdata[key] = updateDataWidthOptionNext(origindata[key], targetdata[key], option, currentnum, nextprop, map)
          }
        }
      }
    }
  } else {
    targetdata = origindata
  }
  return targetdata
}

export default updateDataWidthOptionNext
