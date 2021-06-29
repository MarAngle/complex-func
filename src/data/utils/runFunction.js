import isPromise from './isPromise'
import printMsg from './printMsg'

function runFunction(func, args, callback) {
  let mainRes = {
    status: 'fail',
    code: ''
  }
  function next(callbackRes) {
    if (callback) {
      callback(callbackRes)
    }
  }
  if (typeof func == 'function') {
    let data = func(...args)
    if (isPromise(data)) {
      data.then(res => {
        mainRes.status = 'success'
        mainRes.data = res
        next(mainRes)
      }, err => {
        mainRes.code = 'promiseError'
        mainRes.data = err
        next(mainRes)
      })
    } else {
      mainRes.status = 'success'
      mainRes.data = data
      next(mainRes)
    }
  } else {
    mainRes.code = 'argsError'
    printMsg(`triggerTargetFunc函数运行错误，code: ${mainRes.code}`)
    next(mainRes)
  }
}

export default runFunction
