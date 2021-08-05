import isPromise from '../type/isPromise'

/**
 * next
 * @param {number} remainder
 * @param {*} resolve
 * @param {*[]} resList
 * @param {number} index
 * @param {*} res
 */
function next(remainder, resolve, resList, index, res) {
  resList[index] = res
  remainder--
  if (remainder == 0) {
    resolve(resList)
  }
}

/**
 * Promise.allFinished
 * @param {Promise[]} list Promise列表
 * @returns {Promise}
 */
function promiseAllFinished(list) {
  return new Promise((resolve) => {
    let resList = []
    if (list && list.length > 0) {
      let size = list.length
      let remainder = size
      for (let n = 0; n < size; n++) {
        let item = list[n]
        if (isPromise(item)) {
          item.then(res => {
            next(remainder, resolve, resList, n, res)
          }, err => {
            next(remainder, resolve, resList, n, err)
          })
        } else {
          next(remainder, resolve, resList, n, undefined)
        }
      }
    } else {
      resolve(resList)
    }
  })
}

export default promiseAllFinished
