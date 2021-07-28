import { OBNAME } from './data/config'
import Observer from './data/Observer'

/**
 * 设置观察者数据
 * @param {*} value 需要设置的数据
 * @returns {Observer}
 */
function observe(value) {
  if (typeof value !== 'object') {
    return
  }
  let ob
  if (Object.prototype.hasOwnProperty.call(value, OBNAME) && value[OBNAME] instanceof Observer) {
    ob = value[OBNAME]
  } else {
    ob = new Observer(value)
  }
  return ob
}

export default observe
