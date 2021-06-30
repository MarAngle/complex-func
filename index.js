import mainfunc, { requiredata } from './src/main'
import rule from './src/data/rule'
import environment from './src/data/environment'
import worker from './src/data/worker'
import setData from './src/option/setData'
import notice from './src/option/noticeData'

// import './test/index'

mainfunc.install = function(Vue, options = {}) {
  // 设置属性重置为Vue.set
  setData.setVue(Vue)
  this.init(options)
  if (options.prop === undefined) {
    options.prop = '_func'
  }
  if (options.prop) {
    Vue.prototype[options.prop] = this
  }
}

export { rule, environment, notice, worker, requiredata }

export default mainfunc
