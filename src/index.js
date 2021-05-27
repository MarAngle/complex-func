import mainfunc from './main'
import rule from './data/rule'
import environment from './data/environment'
import worker from './data/worker'
import setData from './option/setData'
import notice from './option/noticeData'

mainfunc.install = function(Vue, options = {}) {
  // 设置属性重置为Vue.set
  setData.setVue(Vue)
  this.init(options)
  Vue.prototype._func = this
}

export { rule, environment, notice, worker }

export default mainfunc
