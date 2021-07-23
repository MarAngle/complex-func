import { OBNAME } from './data/config'
import defineProperty from '../object/defineProperty'
import defineReactive from './defineReactive'
import Dep from './Dep'

class Observer {
  constructor(value) {
    // 每个Observer实例上都存在dep
    this.dep = new Dep()
    defineProperty(value, OBNAME, {
      value: this,
      enumerable: false
    })
    this.walk(value)
    return value
  }
  // 遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k, {})
    }
  }
}

export default Observer
