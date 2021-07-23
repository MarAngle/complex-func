import { OBNAME } from './data/config'
import defineProperty from '../object/defineProperty'
import defineReactive from './defineReactive'

class Observer {
  constructor(value) {
    defineProperty(value, OBNAME, {
      value: this,
      enumerable: false
    })
  }
  // 遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
}

export default Observer
