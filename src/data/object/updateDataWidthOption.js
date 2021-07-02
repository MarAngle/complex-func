import getType from './../type/getType'

/**
 * 基于origindata更新targetdata数据,type默认为add
 * @param {*} targetdata 目标数据
 * @param {*} origindata 数据源,以此数据为准对targetdata进行更新
 * @param {object} option 用户设置的设置项
 * @param {'total' | 'add'} option.type 全更新/附加更新判断值
 * @param {boolean} option.reset 全更新/附加更新判断值
 * @param {LimitData} option.limitData 属性限制判断值
 * @param {boolean | number} option.depth 属性深度判断值
 * @param {number} [currentnum] 当前深度,从1开始计算
 * @param {string} [currentprop] 当前属性,多级按.
 * @param {Map} [map] 循环引用缓存
 * @returns targetdata
 */
function updateDataWidthOption(origindata, targetdata, option, currentnum = 1, currentprop = '', map = new Map()) {
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
            targetdata[key] = updateDataWidthOption(origindata[key], targetdata[key], option, currentnum, nextprop, map)
          }
        }
      }
    }
  } else {
    targetdata = origindata
  }
  return targetdata
}

export default updateDataWidthOption
