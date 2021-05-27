import _environment from './environment'
import _utils from './utils'

let worker = {}

// 格式化func
worker.formatFunc = function(func) {
  let res = {
    type: _utils.getType(func),
    isPromise: false,
    next: false,
    data: func
  }
  if (res.type == 'function') {
    res.next = true
    if (_utils.isPromise(func)) {
      res.isPromise = true
    }
  }
  return res
}

// 获取分支JS代码
worker.getContent = function(func) {
  let content
  if (!func.isPromise) {
    content = `
      onmessage = function (e) {
        var func = ${func.data.toString()}
        var res = func.apply(null, e.data.args)
        postMessage({ status: 'success', data: res })
      }
    `
  } else {
    content = `
      onmessage = function (e) {
        var func = ${func.data.toString()}
        func.apply(null, e.data.args).then(res => {
          postMessage({ status: 'success', data: res })
        }, err => {
          postMessage({ status: 'fail', data: err })
        })
      }
    `
  }
  return content
}

// 执行
worker.doit = function({ func, args }) {
  return new Promise((resolve, reject) => {
    func = this.formatFunc(func)
    if (func.next) {
      if (_environment.getCanUse('Worker')) {
        let content = this.getContent(func)
        let blob = new Blob([content])
        let dofunc = new Worker(window.URL.createObjectURL(blob))
        dofunc.onerror = function (e) {
          reject({ status: 'fail', code: 'error', data: e })
        }
        dofunc.onmessage = function (event) {
          let res = event.data
          if (res.status == 'success') {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        }
        dofunc.postMessage({
          args: args
        })
      } else {
        if (!func.isPromise) {
          let data = func.data.apply(null, args)
          resolve(data)
        } else {
          func.data.apply(null, args).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }
      }
    } else {
      reject({ status: 'fail', code: 'func-error', type: func.type })
    }
  })
}

// 设置
worker.set = function(payload = {}) {
  return new Promise((resolve, reject) => {
    worker.doit(payload).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export default worker
