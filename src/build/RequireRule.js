import Data from './Data'
import config from '../../config'
import TokenRule from './TokenRule'
import getType from './../data/type/getType'
import appendProp from './../data/object/appendProp'

class RequireRule extends Data {
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
    this.$initToken(token)
    this.$initMethods(methods)
  }
  /**
   * 加载token判断相关参数
   * @param {object} [token] token总数据
   */
  $initToken (token = {}) {
    this.token.check = token.check === undefined ? true : token.check
    this.token.fail = token.fail || false
    this.token.data = {}
    if (token.data) {
      for (let n in token.data) {
        this.token.data[n] = new TokenRule(n, token.data[n])
      }
    }
  }
  /**
   * 加载方法
   * @param {object} [methods] 挂载方法
   */
  $initMethods (methods) {
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
  /**
   * token失败的回调
   * @param {string} tokenName 失败的tokenName
   */
  tokenFail (tokenName) {
    if (this.token.fail) {
      this.token.fail(tokenName, this)
    }
  }
  /**
   * 请求失败的回调,返回需要警告的信息，返回空则在显示时自动判断
   * @param {*} errRes 失败信息
   * @returns {string}
   */
  requireFail (errRes) {
    if (this.failMsg) {
      return this.failMsg(errRes)
    } else {
      return ''
    }
  }

  /**
   * 主要函数=>实现url的格式化，token的判断和添加
   * @param {object} optionData 请求数据
   * @returns {object}
   */
  format (optionData) {
    optionData.url = this.formatUrl(optionData.url)
    return this.appendToken(optionData)
  }

  /**
   * 判断并添加token,不返回时说明成功
   * @param {object} optionData 请求数据
   * @returns {undefined | { prop, next, code, msg }}
   */
  appendToken (optionData) {
    if (this.token.check) {
      if (optionData.token === undefined) {
        optionData.token = config.RequireRule.defaultTokenName
      }
      let type = getType(optionData.token)
      if (type == 'string') {
        if (optionData.token === config.RequireRule.defaultTokenName) {
          for (let n in this.token.data) {
            let check = this.$appendTokenNext(optionData, n)
            if (!check.next) {
              return check
            }
          }
        } else {
          let check = this.$appendTokenNext(optionData, optionData.token)
          if (!check.next) {
            return check
          }
        }
      } else if (type == 'array') {
        for (let n in optionData.token) {
          let check = this.$appendTokenNext(optionData, optionData.token[n])
          if (!check.next) {
            return check
          }
        }
      } else if (type == 'object') {
        for (let n in optionData.token) {
          let check = this.$appendTokenNext(optionData, n, optionData.token[n])
          if (!check.next) {
            return check
          }
        }
      }
    }
  }

  /**
   * 添加token next
   * @param {object} optionData 请求数据
   * @param {string} prop tokenName
   * @param {object} [tokenRuleOption] TokenRule的初始化数据
   * @returns {{ prop, next, code, msg }}
   */
  $appendTokenNext (optionData, prop, tokenRuleOption) {
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

  /**
   * 根据prop获取token对应的规则,存在tokenRuleOption时按照tokenRuleOption生成新的TokenRule
   * @param {string} prop tokenName
   * @param {object} [tokenRuleOption] TokenRule的初始化数据
   * @returns {false | TokenRule}
   */
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
  /**
   * 获取token数据
   * @param {string} tokenName 需要获取的tokenName
   * @returns {boolean}
   */
  getToken (tokenName) {
    if (this.token.data[tokenName]) {
      return this.token.data[tokenName].getData(this.prop)
    } else {
      return false
    }
  }
  /**
   * 设置token的值
   * @param {string} tokenName 需要设置的tokenName
   * @param {*} data 值
   * @param {boolean} [noSave] 不保存判断值
   */
  setToken (tokenName, data, noSave) {
    if (!this.token.data[tokenName]) {
      this.token.data[tokenName] = new TokenRule(tokenName, data)
    } else {
      this.token.data[tokenName].setData(this.prop, data, noSave)
    }
  }

  /**
   * 清除token数据
   * @param {string} tokenName 需要清除的tokenName
   * @returns {boolean}
   */
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
      this.$exportMsg(`未指定需要删除的token`)
      return false
    }
  }
  /**
   * 清除token数据Next
   * @param {string} tokenName 需要清除的tokenName
   * @param {boolean} isDelete 是否进行删除
   */
  removeTokenByName (tokenName, isDelete) {
    if (this.token.data[tokenName]) {
      this.token.data[tokenName].removeData(this.prop, isDelete)
      if (isDelete) {
        delete this.token.data[tokenName]
      }
    }
  }

  /**
   * 删除token数据
   * @param {string} tokenName 需要删除的tokenName
   * @returns {boolean}
   */
  deleteToken (tokenName) {
    if (tokenName) {
      if (tokenName === true) {
        for (let n in this.token.data) {
          this.removeTokenByName(n, true)
        }
      } else {
        this.removeTokenByName(tokenName, true)
      }
      return true
    } else {
      this.$exportMsg(`未指定需要删除的token`)
      return false
    }
  }

  $selfName() {
    return `(${super.$selfName()}:[${this.name}/${this.prop}])`
  }
}

RequireRule.$name = 'RequireRule'

export default RequireRule
