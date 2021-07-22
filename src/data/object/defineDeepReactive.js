import printMsg from './../utils/printMsg'
import defineReactive from './defineReactive'

function defineDeepReactive(obj, prop, option, val) {
  let fg = defineReactive(obj, prop, option, val)
  if (fg) {

  } else {
    return fg
  }
}

export default defineDeepReactive
