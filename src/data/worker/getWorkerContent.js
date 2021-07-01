
/**
 * 生成分支线程的代码
 * @param {function} func 函数体
 * @param {boolean} [isSync] 同步异步判断
 * @param {boolean} [log] 日志打印判断
 * @returns {string} 分支代码字符串
 */
function getWorkerContent(func, isSync, log) {
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

export default getWorkerContent
