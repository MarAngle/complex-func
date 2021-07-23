
var uid = 0

class Dep {
  constructor() {
    this.id = uid++
    // 用数组存储订阅者,也就是Watcher的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify() {
    // 浅拷贝
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

export default Dep
