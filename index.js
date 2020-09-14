import _notice from '@/mainnotice/index'
import Require from './build/Require'
import _utils from './data/utils'
import _check from './data/check'

let mainfunc = {
  BASE_DATA: {}
}

mainfunc._initMod = function(mod) {
  if (mod._funclist) {
    for (let i in mod._funclist) {
      let funcname = mod._funclist[i]
      this._setFunc(funcname, mod[funcname], mod)
    }
  } else {
    for (let n in mod) {
      if (_utils.getType(mod[n]) == 'function') {
        this._setFunc(n, mod[n], mod)
      }
    }
  }
}

mainfunc._setFunc = function(funcname, funcdata, target) {
  if (!this[funcname]) {
    this[funcname] = funcdata.bind(target)
  } else {
    console.error(`func init error: ${funcname} is defined`)
  }
}


mainfunc._initMod(_utils)
mainfunc._initMod(_check)
mainfunc._initMod(_notice)

mainfunc.init = function({ require }) {
  let requiredata = new Require(require)
  mainfunc._initMod(requiredata)
}

export default mainfunc
