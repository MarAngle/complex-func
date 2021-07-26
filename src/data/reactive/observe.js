import { OBNAME } from './data/config'
import Observer from './Observer'

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
