import runFunction from './../../data/function/runFunction'
import triggerPromise from './../../data/function/triggerPromise'

(function() {
  let baseFunction = function(name) {
    return name
  }
  let promiseFunction = function(name) {
    return new Promise((resolve, reject) => {
      resolve({ name: name })
    })
  }

  triggerPromise({
    func: function() {},
    args: [],
    error: (code) => {
      if (code != 'notPromise') {
        console.error('triggerPromise错误')
      }
    }
  })
  triggerPromise({
    func: promiseFunction,
    args: ['promise'],
    error: (code) => {
      console.error('triggerPromise错误')
    },
    start: () => {
    },
    success: (res) => {
      if (res.name != 'promise') {
        console.error('triggerPromise错误')
      }
    },
    fail: (res) => {
      console.error('triggerPromise错误', res)
    }
  })

  runFunction(baseFunction, ['base'], function(res) {
    if (res.data != 'base') {
      console.error('runFunction错误', res)
    }
  })
  runFunction(promiseFunction, ['promise'], function(res) {
    if (res.data.name != 'promise') {
      console.error('runFunction错误', res)
    }
  })
})();
