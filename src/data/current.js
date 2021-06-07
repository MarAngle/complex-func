
const defaultOffset = 1000 * 60 * 10 // 10分钟

let callbackProp = 0

let current = {
  timer: undefined,
  data: {
    data: null
  },
  offset: {
    data: defaultOffset,
    list: []
  },
  callback: {}
}

// 加载
current.init = function() {
  this.autoUpdate('init')
}
// 自动更新
current.autoUpdate = function(from) {
  this.update(from)
}

// 计算时间间隔
current.countOffset = function() {
  let data
  for (let n = 0; n < this.offset.list.length; n++) {
    if (data === undefined) {
      data = this.offset.list[n]
    } else if (data > this.offset.list[n]) {
      data = this.offset.list[n]
    }
  }
  if (data === undefined) {
    data = defaultOffset
  }
  this.offset.data = data
}
// 设置时间间隔
current.setOffset = function(offset, auto = true) {
  this.offset.list.push(offset)
  this.countOffset()
  if (auto) {
    this.autoUpdate('set')
  }
}
// 删除对应时间间隔
current.removeOffset = function(offset, auto = true) {
  let index = this.offset.list.indexOf(offset)
  if (index > -1) {
    this.offset.list.splice(index, 1)
    this.countOffset()
    this.countOffset()
    if (auto) {
      this.autoUpdate('remove')
    }
  }
}
// 更新操作
current.update = function(from) {
  this.clear()
  this.setData(new Date())
  this.triggerCallback(this.getData(), from)
  this.timer = setTimeout(() => {
    this.update('update')
  }, this.offset.data)
}
// 清除更新
current.clear = function() {
  if (this.timer !== undefined) {
    clearTimeout(this.timer)
    this.timer = undefined
  }
}
// 触发回调
current.triggerCallback = function(currentDate, from) {
  for (let n in this.callback) {
    if (this.callback[n]) {
      this.callback[n](currentDate, from)
    }
  }
}
// 设置回调
current.setCallback = function(fn) {
  callbackProp++
  this.callback[callbackProp] = fn
  return callbackProp
}
// 删除回调
current.removeCallback = function(prop) {
  if (this.callback[prop]) {
    delete this.callback[prop]
  }
}
// 设置数据
current.setData = function(data, prop = 'data') {
  this.data[prop] = data
}
// 获取数据
current.getData = function(prop = 'data') {
  return this.data[prop]
}

current.init()

export default current
