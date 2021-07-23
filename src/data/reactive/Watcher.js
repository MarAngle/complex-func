var uid = 0
class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
  }
  update() {

  }
}

export default Watcher
