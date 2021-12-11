import mainfunc from './src/main'
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
    Vue.observable(this)
    Vue.prototype[options.prop] = this
  }
  if (options.toGlobal) {
    window[options.prop] = this
  }
}

export { notice, setData }

export default mainfunc
