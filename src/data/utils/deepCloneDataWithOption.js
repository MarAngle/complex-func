import formatUpdateDataOption from './formatUpdateDataOption'
import updateDataWidthOption from './updateDataWidthOption'

/**
 * 可定制的深拷贝
 * @param {*} origindata 深拷贝对象
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} [option.reset] 全更新/附加更新判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @returns
 */
function deepCloneDataWithOption(origindata, option) {
  option = formatUpdateDataOption(option, {})
  return updateDataWidthOption(origindata, undefined, option)
}

export default deepCloneDataWithOption
