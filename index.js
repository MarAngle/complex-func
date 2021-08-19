import mainfunc, { requiredata } from './src/main'
import setData from './src/option/setData'
import notice from './src/option/noticeData'

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

export { notice, requiredata }

export default mainfunc
