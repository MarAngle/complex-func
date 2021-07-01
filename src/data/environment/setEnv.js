import option from './option/index'

/**
 * 设置环境变量
 * @param {*} data 环境变量
 * @param {'data' | 'real'} prop 环境变量,data为当前环境变量,real为当前真实的环境变量
 */
function setEnv(data, prop = 'data') {
  option.env[prop] = data
}

export default setEnv
