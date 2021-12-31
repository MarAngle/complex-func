import { getCanUse } from './../environment/index'
import getType from './../type/getType'
import getWorkerContent from './getWorkerContent'

/**
 * 进行worker调用,不可用时直接进行调用
 * @param {object} option 设置项
 * @param {function} option.func 函数体
 * @param {*[]} option.args 函数参数列表
 * @param {boolean} [option.sync] 是否同步函数
 * @param {boolean} [option.log] 日志打印判断
 * @returns {Promise} 分支运行的Promise
 */
function workerDo({ func, args, option, sync, log }) {
  return new Promise((resolve, reject) => {
    let type = getType(func)
    if (type == 'function') {
      if (getCanUse('Worker')) {
        let content = getWorkerContent(func, sync, log)
        let blob = new Blob([content], { type: 'text/javascript' })
        let url = window.URL.createObjectURL(blob)
        let dofunc = new Worker(url, option || {})
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
        window.URL.revokeObjectURL(url)
      } else {
        if (sync) {
          // 同步函数直接运行
          let data = func.apply(null, args)
          resolve(data)
        } else {
          // 异步函数Promise
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

export default workerDo
