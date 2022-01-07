import transformTime from './transformTime'
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
function formatTime(data, parseOption, showFormat, complex) {
  if (!complex) {
    return transformTime(data, parseOption, showFormat)
  } else {
    return showTime(parseTime(data, parseOption), showFormat)
  }
}

console.log(formatTime('2020/01 11:28:00', 'YYYY/MM HH:mm:ss', 'YYYY//MM-/DD HH:mm:/ss'))
console.log(formatTime('2020/01-01 11:28', 'YYYY/MM-DD HH:mm:ss', 'YYYY//MM-/DD HH:mm:/ss'))
console.log(formatTime('2020/01-01 11:28', 'YYYY/MM-DD HH:mm:ss', 'YYYY//MM-/DD HH:mm:/ss'))

export default formatTime
