import SimpleData from './SimpleData'
import getType from './../data/type/getType'
import printMsgAct from './../data/utils/printMsgAct'
import appendProp from './../data/object/appendProp'
import TokenRule from './TokenRule'

class RequireRule extends SimpleData {
  constructor ({
    name,
    prop,
    token,
    methods
  }) {
    super()
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
    this.token.data = {}
    if (token.data) {
      for (let n in token.data) {
        this.token.data[n] = new TokenRule(n, token.data[n])
      }
    }
  }
  // 加载方法
  initMethods (methods) {
    if (methods) {
      for (let n in methods) {
        this[n] = methods[n].bind(this)
      }
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
        optionData.token = 'default'
      }
      let type = getType(optionData.token)
      if (type == 'string') {
        if (optionData.token === 'default') {
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
    let tokenRuleItem = this.getTokenRule(prop, tokenRuleOption)
    let tokenRuleData
    if (tokenRuleItem) {
      tokenRuleData = tokenRuleItem.getData(this.prop)
      let next = tokenRuleItem.checkData(tokenRuleData)
      if (next == 'success') {
        if (tokenRuleItem.location == 'body') {
          appendProp(optionData.data, prop, tokenRuleData, optionData.localType)
        } else if (tokenRuleItem.location == 'header') {
          optionData.headers[prop] = tokenRuleData
        } else if (tokenRuleItem.location == 'params') {
          optionData.params[prop] = tokenRuleData
        }
      } else if (next == 'fail') {
        check.next = false
        check.code = 'undefined token'
        check.msg = `TOKEN:${prop}的值不存在`
      }
      // ''不进行任何操作
    } else {
      check.next = false
      check.code = 'undefined rule prop'
      check.msg = `未找到${prop}对应的token规则`
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
      return new TokenRule(prop, tokenRuleOption)
    }
  }
  // 删除token数据
  removeToken (tokenName) {
    if (tokenName) {
      if (tokenName === true) {
        for (let n in this.token.data) {
          this.removeTokenByName(n)
        }
      } else {
        this.removeTokenByName(tokenName)
      }
      return true
    } else {
      this.printMsg(`未指定需要删除的token`)
      return false
    }
  }
  // 删除token数据Next
  removeTokenByName (tokenName) {
    if (this.token.data[tokenName]) {
      this.token.data[tokenName].removeData(this.prop)
      delete this.token.data[tokenName]
    }
  }
  // 获取token数据
  getToken (tokenName) {
    if (this.token.data[tokenName]) {
      return this.token.data[tokenName].getData(this.prop)
    } else {
      return false
    }
  }
  // 设置token
  setToken (tokenName, data, noSave) {
    if (!this.token.data[tokenName]) {
      this.token.data[tokenName] = new TokenRule(tokenName, data)
    } else {
      this.token.data[tokenName].setData(this.prop, data, noSave)
    }
  }
  _selfName() {
    return `(${this.constructor.name}:[${this.name}/${this.prop}])`
  }
}

export default RequireRule
