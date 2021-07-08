import getLocalData from '../data/local/getLocalData'
import removeLocalData from '../data/local/removeLocalData'
import setLocalData from '../data/local/setLocalData'
import getType from './../data/type/getType'

const defaultOption = {
  location: 'body', // 默认赋值位置
  defaultName: 'default', // 默认操作判断字符串
  empty: false // 值不为真时的上传操作判断值： 真上传空值 否则不上传 require = false 时生效
}

class TokenRule {
  constructor (prop, initdata) {
    this.initMain(prop, initdata)
  }
  // 创建tokenRule
  initMain (prop, initdata) {
    let type = getType(initdata)
    if (type !== 'object') {
      initdata = {
        data: initdata
      }
    }
    this.prop = prop
    this.require = initdata.require || false
    this.data = initdata.data || undefined
    this.location = initdata.location || defaultOption.location
    this.empty = initdata.empty === undefined ? defaultOption.empty : initdata.empty
    this.getCurrentData = initdata.getData || false
    this.checkCurrentData = initdata.checkData || function(data) {
      return data || data === 0
    }
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
