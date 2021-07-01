import option from './option/index'

/**
 * 获取环境变量
 * @param {'data' | 'real'} prop 环境变量,data为当前环境变量,real为当前真实的环境变量
 */
function getEnv(prop = 'data') {
  return option.env[prop]
}

export default getEnv
