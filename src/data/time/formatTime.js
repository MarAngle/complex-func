import parseTime from './parseTime'
import showTime from './showTime'

/**
 * 将Date字符串根据格式转换为Date字符串
 * @param {string} data data
 * @param {string | object} [parseOption]
 * @param {string} [parseOption.format] Date字符串格式YYYY-MM-DD HH:ss:mm
 * @param {string} [parseOption.current] 未传递参数是否按照当前时间为基准
 * @param {string} showFormat Date字符串格式YYYY-MM-DD HH:ss:mm
 * @returns {string}
 */
function formatTime(data, parseOption, showFormat) {
  let date = parseTime(data, parseOption)
  return showTime(date, showFormat)
}

export default formatTime
