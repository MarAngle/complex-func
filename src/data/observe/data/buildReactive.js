import defineReactive from './../../reactive/defineReactive'
import observe from './../observe'
import Dep from './Dep'

function buildReactive(obj, prop) {
  const dep = new Dep()
  let childOb = observe(obj[prop])
  return defineReactive(obj, prop, {
    get: function() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
    },
    set: function(val, oldVal) {
      childOb = observe(val)
      dep.notify()
    }
  })
}
export default buildReactive
