import option from './option/index'

/**
 * 设置环境数据
 * @param {*} data 环境数据
 * @param {'data' | 'real'} prop 环境数据,data为当前环境数据,real为当前真实的环境数据
 */
function setEnvMode(data, prop = 'data') {
  option.mode[prop] = data
}

export default setEnvMode
