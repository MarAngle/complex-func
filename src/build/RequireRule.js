import getType from './../data/type/getType'
import printMsgAct from './../data/utils/printMsgAct'
import appendProp from './../data/utils/appendProp'
import getLocalData from './../data/local/getLocalData'
import setLocalData from './../data/local/setLocalData'

const defaultOption = {
  location: 'body', // 默认赋值位置
  defaultName: 'default', // 默认操作判断字符串
  empty: false // 值不为真时的上传操作判断值： 真上传空值 否则不上传 require = false 时生效
}

class RequireRule {
  constructor ({
    name,
    prop,
    token,
    methods
  }) {
    this.name = name
    this.prop = prop
    this.token = {
      check: true, // 是否检查token
      fail: false, // token失败回调
      data: {}
    }
    this.initToken(token)
    this.initMethods(methods)
  }
  // 加载token判断相关参数
  initToken (token = {}) {
    this.token.check = token.check === undefined ? true : token.check
    this.token.fail = token.fail || false
    let tokenOption = {}
    if (token.data) {
      for (let n in token.data) {
        let optionItem = this.buildTokenRule(token.data[n])
        tokenOption[n] = optionItem
      }
    }
    this.token.data = tokenOption
  }
  // 创建tokenRule
  buildTokenRule (origindata) {
    let targetitem = {}
    let type = getType(origindata)
    if (type == 'string') {
      origindata = {
        data: origindata
      }
    }
    targetitem.require = origindata.require || false
    targetitem.data = origindata.data || undefined
    targetitem.location = origindata.location || defaultOption.location
    targetitem.empty = origindata.empty === undefined ? defaultOption.empty : origindata.empty
    targetitem.getData = origindata.getData || false
    targetitem.checkData = origindata.checkData || false
    origindata = null
    return targetitem
  }
  // 加载方法
  initMethods (methods) {
    for (let n in methods) {
      this[n] = methods[n].bind(this)
    }
    if (!this.formatUrl) {
      this.formatUrl = function (url) {
        return url
      }
    }
  }
  // token失败的回调
  tokenFail (tokenName) {
    if (this.token.fail) {
      this.token.fail(tokenName, this)
    }
  }
  // 请求失败的回调
  requireFail (errRes) {
    if (this.failMsg) {
      return this.failMsg(errRes)
    } else {
      return ''
    }
  }

  // 主要函数=>实现url的格式化，token的判断和添加
  format (optionData) {
    optionData.url = this.formatUrl(optionData.url)
    return this.appendToken(optionData)
  }

  // 添加判断token
  appendToken (optionData) {
    if (this.token.check) {
      if (optionData.token === undefined) {
        optionData.token = defaultOption.defaultName
      }
      let type = getType(optionData.token)
      if (type == 'string') {
        if (optionData.token == defaultOption.defaultName) {
          for (let n in this.token.data) {
            let check = this.appendTokenNext(optionData, n)
            if (!check.next) {
              return check
            }
          }
        } else {
          let check = this.appendTokenNext(optionData, optionData.token)
          if (!check.next) {
            return check
          }
        }
      } else if (type == 'array') {
        for (let n in optionData.token) {
          let check = this.appendTokenNext(optionData, optionData.token[n])
          if (!check.next) {
            return check
          }
        }
      } else if (type == 'object') {
        for (let n in optionData.token) {
          let check = this.appendTokenNext(optionData, n, optionData.token[n])
          if (!check.next) {
            return check
          }
        }
      }
    }
  }

  // 添加token next
  appendTokenNext (optionData, prop, tokenRuleOption) {
    let check = {
      prop: prop,
      next: true,
      code: '',
      msg: ''
    }
    let append = true
    let tokenRule = this.getTokenRule(prop, tokenRuleOption)
    let tokenRuleData
    if (tokenRule) {
      tokenRuleData = this.getTokenDataByRule(prop, tokenRule)
      if (!tokenRuleData) {
        if (tokenRule.checkData && tokenRule.checkData(tokenRuleData)) {
          //
        } else { // 不存在检查函数或者检查函数返回否
          if (tokenRule.require) {
            check.next = false
            check.code = 'undefined token'
            check.msg = `TOKEN:${prop}的值不存在`
          } else {
            if (!tokenRule.empty) {
              append = false
            }
          }
        }
      }
    } else {
      check.next = false
      check.code = 'undefined rule prop'
      check.msg = `未找到${prop}对应的token规则`
    }
    if (check.next && append) {
      if (tokenRule.location == 'body') {
        appendProp(optionData.data, prop, tokenRuleData, optionData.localType)
      } else if (tokenRule.location == 'header') {
        optionData.headers[prop] = tokenRuleData
      } else if (tokenRule.location == 'params') {
        optionData.params[prop] = tokenRuleData
      }
    }
    return check
  }

  // 根据prop获取token对应的规则
  getTokenRule (prop, tokenRuleOption) {
    if (!tokenRuleOption) {
      if (this.token.data[prop]) {
        return this.token.data[prop]
      } else {
        return false
      }
    } else {
      return this.buildTokenRule(this.tokenRuleOption)
    }
  }

  // 获取token的值
  getTokenDataByRule (prop, tokenRule) {
    let data
    if (tokenRule.getData) {
      data = tokenRule.getData()
    } else {
      data = tokenRule.data
    }
    if (!data) {
      data = getLocalData(this._buildTokenName(prop))
      if (data) {
        this.setToken(prop, data, true)
      }
    }
    return data
  }
  // 删除token数据
  removeToken (tokenName) {
    if (tokenName) {
      if (tokenName === true) {
        for (let n in this.token.data) {
          this.setToken(n, '')
        }
      } else {
        this.setToken(tokenName, '')
      }
      return true
    } else {
      this.printMsg(`未指定需要删除的token`)
      return false
    }
  }
  // 获取token数据
  getToken (tokenName) {
    if (this.token.data[tokenName]) {
      return this.getTokenDataByRule(tokenName, this.token.data[tokenName])
    } else {
      return false
    }
  }
  // 设置token
  setToken (tokenName, data, noSave) {
    if (!this.token.data[tokenName]) {
      this.token.data[tokenName] = this.buildTokenRule(data)
    } else {
      this.token.data[tokenName].data = data
    }
    if (!noSave) {
      setLocalData(this._buildTokenName(tokenName), data)
    }
  }
  _buildTokenName (prop) {
    return `${this.prop}-${prop}`
  }
  printMsg(info, type = 'error', option) {
    printMsgAct(this._selfName() + ':' + info, type, option)
  }
  _selfName() {
    return `(${this.constructor.name}:[${this.name}/${this.prop}])`
  }
  toString () {
    return this._selfName()
  }
}

export default RequireRule
