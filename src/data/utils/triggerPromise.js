import printMsg from './printMsg'
import isPromise from './isPromise'
import triggerFunc from './triggerFunc'

function triggerPromise({
  func,
  args,
  promise,
  error,
  start,
  success,
  fail,
  finish
}) {
  let next = true
  let code = ''
  if (!promise) {
    if (!func) {
      next = false
      code = 'argsError'
    } else {
      if (!args) {
        args = []
      }
      promise = func(...args)
    }
  }
  if (next) {
    if (!isPromise(promise)) {
      next = false
      code = 'notPromise'
    }
  }
  if (next) {
    triggerFunc(start)
    promise.then(res => {
      triggerFunc(success, res)
      triggerFunc(finish, res)
    }, err => {
      triggerFunc(fail, err)
      triggerFunc(finish, err)
    })
  } else {
    if (!triggerFunc(error, code)) {
      printMsg(`triggerPromise函数运行错误，code: ${code}`)
    }
  }
}

export default triggerPromise
