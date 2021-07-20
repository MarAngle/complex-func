import formatUpdateDataOption from './formatUpdateDataOption'
import updateDataWidthOption from './updateDataWidthOption'

/**
 * 基于origindata更新targetdata数据,type默认为add
 * @param {*} targetdata 目标数据
 * @param {*} origindata 数据源,以此数据为准对targetdata进行更新
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} [option.reset] 全更新/附加更新判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @returns targetdata
 */
function updateData(targetdata, origindata, option = {}) {
  option = formatUpdateDataOption(option, {
    type: 'add'
  })
  targetdata = updateDataWidthOption(targetdata, origindata, option)
  return targetdata
}

export default updateData
