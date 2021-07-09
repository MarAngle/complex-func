import getLocalData from '../data/local/getLocalData'
import removeLocalData from '../data/local/removeLocalData'
import setLocalData from '../data/local/setLocalData'
import getType from './../data/type/getType'

class TokenRule {
  constructor (prop, initdata) {
    let type = getType(initdata)
    if (type !== 'object') {
      initdata = {
        data: initdata
      }
    }
    this.prop = prop
    this.require = initdata.require || false
    this.data = initdata.data || undefined
    this.location = initdata.location || 'body'
    this.empty = initdata.empty === undefined ? false : initdata.empty
    this.getCurrentData = initdata.getData || false
    this.checkCurrentData = initdata.checkData || function(data) {
      return data || data === 0
    }
  }
  // 创建tokenRule
  initMain (prop, initdata) {
  }
  getData(parentProp) {
    let data
    if (this.getCurrentData) {
      data = this.getCurrentData()
    } else {
      data = this.data
    }
    if (!this.checkCurrentData(data)) {
      data = getLocalData(this.buildLocalTokenName(parentProp))
      if (this.checkCurrentData(data)) {
        this.setData(parentProp, data, true)
      }
    }
    return data
  }
  setData(parentProp, data, noSave) {
    this.data = data
    if (!noSave) {
      setLocalData(this.buildLocalTokenName(parentProp), data)
    }
  }
  removeData(parentProp) {
    removeLocalData(this.buildLocalTokenName(parentProp))
  }
  buildLocalTokenName(parentProp) {
    return `${parentProp || ''}-${this.prop}`
  }
  checkData(data) {
    let next = 'success'
    if (!this.checkCurrentData(data)) {
      // 当前值检查判断为不存在
      if (this.require) {
        next = 'fail'
      } else if (!this.empty) {
        next = ''
        // 值不存在切不要求时,empty为否不上传空值,此时为'',不进行append操作
      } else {
        // 值不存在切不要求时,传递,此时为success
      }
    }
    return next
  }
}

export default TokenRule