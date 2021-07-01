let option = {
  env: {
    data: process.env.NODE_ENV,
    real: process.env.NODE_ENV
  },
  mode: {
    data: '',
    real: ''
  },
  canUse: {
    Worker: false,
    Proxy: false,
    Symbol: false,
    MutationObserver: false
  }
}

/**
 * 设置环境变量
 * @param {*} data 环境变量
 * @param {'data' | 'real'} prop 环境变量,data为当前环境变量,real为当前真实的环境变量
 */
 export function setEnv(data, prop = 'data') {
  option.env[prop] = data
}

/**
 * 获取环境变量
 * @param {'data' | 'real'} prop 环境变量,data为当前环境变量,real为当前真实的环境变量
 */
 export function getEnv(prop = 'data') {
  return option.env[prop]
}

/**
 * 设置环境数据
 * @param {*} data 环境数据
 * @param {'data' | 'real'} prop 环境数据,data为当前环境数据,real为当前真实的环境数据
 */
export function setEnvMode(data, prop = 'data') {
  option.mode[prop] = data
}

/**
 * 获取环境变量
 * @param {'data' | 'real'} prop 环境变量,data为当前环境变量,real为当前真实的环境变量
 */
 export function getEnvMode(prop = 'data') {
  return option.mode[prop]
}

/**
 * 设置全局属性是否可用
 * @param {string} prop 属性
 * @param {boolean} data 可用
 */
 export function setCanUse(prop, data) {
  option.canUse[prop] = data
}

/**
 * 判断prop是否可用
 * @param {string} prop
 * @returns {boolean}
 */
export function getCanUse(prop) {
  return option.canUse[prop]
}

/**
 * 检查全局函数是否可用
 * @param {*} Name 全局函数名
 * @param {*} prop 需要挂载的属性
 * @param {*} showError 是否显示错误信息
 */
 export function checkUseItem(Name, prop, showError) {
  try {
    if (window[Name]) {
      setCanUse(prop || Name, true)
    }
  } catch (e) {
    if (showError) {
      console.error(e)
    }
  }
}

/**
 * 检查可用
 */
function checkUse() {
  console.log('checkUse')
  const showError = false
  checkUseItem('Worker', 'Worker', showError)
  checkUseItem('Proxy', 'Proxy', showError)
  checkUseItem('Symbol', 'Symbol', showError)
  checkUseItem('MutationObserver', 'MutationObserver', showError)
}

checkUse()