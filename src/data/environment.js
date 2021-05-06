
let environment = {
  env: {
    data: process.env.NODE_ENV,
    real: process.env.NODE_ENV
  },
  mode: {
    data: '',
    real: ''
  },
  canUse: {
    Proxy: false,
    Symbol: false,
    MutationObserver: false
  }
}

// 设置环境变量
environment.setEnv = function (data, prop = 'data') {
  this.env[prop] = data
}
// 获取环境变量
environment.getEnv = function (prop = 'data') {
  return this.env[prop]
}
// 设置环境数据
environment.setEnvMode = function (data, prop = 'data') {
  this.mode[prop] = data
}
// 获取环境数据
environment.getEnvMode = function (prop = 'data') {
  return this.mode[prop]
}

environment.checkUse = function() {
  const showError = false
  this.checkUseItem('Proxy', 'Proxy', showError)
  this.checkUseItem('Symbol', 'Symbol', showError)
  this.checkUseItem('MutationObserver', 'MutationObserver', showError)
}
environment.checkUseItem = function(Name, prop, showError) {
  try {
    if (window[Name]) {
      this.setCanUse(prop || Name, true)
    }
  } catch (e) {
    if (showError) {
      console.error(e)
    }
  }
}

environment.setCanUse = function(prop, data) {
  this.canUse[prop] = data
}

// 获取canUse数据
environment.getCanUse = function(prop) {
  return this.canUse[prop]
}

environment.checkUse()

export default environment
