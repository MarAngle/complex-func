import mainfunc from './src/main'
import setData from './src/option/setData'
import notice from './src/option/noticeData'

mainfunc.install = function(Vue, options = {}) {
  this.init(options)
  if (options.prop === undefined) {
    options.prop = '_func'
  }
  if (options.toGlobal) {
    window[options.prop] = this
  }
  let version = Vue.version.split('.')[0]
  if (version == '2') {
    // 设置属性重置为Vue.set
    setData.setVue(Vue)
    if (options.prop) {
      // 构建响应式数据
      for (let prop in this) {
        if (this.getType(this[prop] == 'object')) {
          Vue.observable(this[prop])
        }
      }
      Vue.prototype[options.prop] = this
    }
  } else if (version == '3') {
    Vue.config.globalProperties[options.prop] = this
  }
}

export { notice, setData }

export default mainfunc
