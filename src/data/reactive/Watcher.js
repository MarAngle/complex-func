import Dep from './Dep'
import parsePath from './parsePath'

var uid = 0
class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.getter()
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
      // 退出依赖收集阶段
      Dep.target = null
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const value = this.get()
    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

export default Watcher
