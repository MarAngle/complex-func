import mainfunc, { requiredata } from './main'
import rule from './data/rule'
import environment from './data/environment'
import worker from './data/worker'
import setData from './option/setData'
import notice from './option/noticeData'

import './test/index'

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
