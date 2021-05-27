import _environment from './environment'
import _utils from './utils'

let worker = {}

// 获取分支JS代码
worker.getContent = function(func, isSync, log) {
  let content
  if (!isSync) {
    content = `
      onmessage = function (e) {
        ${log ? 'console.log("Worker Start")' : ''}
        var func = ${func.toString()}
        var res = func.apply(null, e.data.args)
        postMessage({ status: 'success', data: res })
        ${log ? 'console.log("Worker Finish")' : '' }
      }
    `
  } else {
    content = `
      onmessage = function (e) {
        ${log ? 'console.log("Worker Start")' : '' }
        var func = ${func.toString()}
        func.apply(null, e.data.args).then(res => {
          postMessage({ status: 'success', data: res })
          ${log ? 'console.log("Worker Success")' : '' }
        }, err => {
          postMessage({ status: 'fail', data: err })
          ${log ? 'console.log("Worker Fail")' : '' }
        })
      }
    `
  }
  return content
}

// 执行
worker.doit = function({ func, args, isSync, log }) {
  return new Promise((resolve, reject) => {
    let type = _utils.getType(func)
    if (type == 'function') {
      if (_environment.getCanUse('Worker')) {
        let content = this.getContent(func, isSync, log)
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
        if (!isSync) {
          let data = func.apply(null, args)
          resolve(data)
        } else {
          func.apply(null, args).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }
      }
    } else {
      reject({ status: 'fail', code: 'func-error', type: type })
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
