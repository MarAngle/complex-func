import getType from '../type/getType'
import Dep from './Dep'
import parsePath from './parsePath'
import traverse from './traverse'

var uid = 0
class Watcher {
  constructor(target, expression, option) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    let optionType = getType(option)
    if (optionType != 'object') {
      option = {
        handler: option
      }
    }
    this.callback = option.handler
    this.deep = !!option.deep
    this.value = this.get()
  }
  update() {
    this.run()
  }
  get() {
    // 进入依赖收集阶段,让全局的Dep.target设置为watcher本身
    Dep.target = this
    const obj = this.target
    let value
    try {
      value = this.getter(obj)
    } finally {
      if (this.deep) {
        traverse(value)
      }
      // 退出依赖收集阶段
      Dep.target = null
    }
    return value
  }
  run() {
    const value = this.get()
    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      this.callback.call(this.target, value, oldValue)
    }
  }
}

export default Watcher
