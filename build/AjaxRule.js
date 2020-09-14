import _utils from './../data/utils'
import _notice from '@/mainnotice/index'

const defaultOpt = {
  location: 'body', // 默认赋值位置
  defaultName: 'default', // 默认操作判断字符串
  post: 'all' // 为空时的上传操作unempty不上传空值all则全上传 require = false 时生效
}

class AjaxRule {
  constructor({
    name,
    prop,
    token,
    methods
  }) {
    this.name = name
    this.prop = prop
    this.token = {
      check: true,
      data: {}
    }
    this._initToken(token)
    this._initMethods(methods)
  }
  /*
  require
  data
  empty
  location
  */
  _initToken(token = {}) {
    this.token.check = token.check || false
    this.token.data = token.data || {}
  }

  _initMethods (methods) {
    for (let n in methods) {
      this[n] = methods[n].bind(this)
    }
    if (!this.formatUrl) {
      this.formatUrl = function(url) {
        return url
      }
    }
  }
  /*
  接受3种token类型
  1.数组格式，数组值为token字段名并从对象中获取值
  2.字符串格式，为token字段名并从对象中获取值 - 0.字符串的默认值，此时根据默认值操作
  3.对象格式，键值为token字段名，根据格式获取值
  */
  formatToken(token, data, headers, query, localType) {
    if (this.token.check) {
      if (token === undefined) {
        token = defaultOpt.defaultName
      }
      let type = _utils.getType(token)
      if (type == 'string') {
        if (token == defaultOpt.defaultName) {
          for (let n in this.token.data) {
            this._setToken(n, data, headers, query, localType)
          }
        } else {
          this._setToken(token, data, headers, query, localType)
        }
      } else if (type == 'array') {
        for (let n in token) {
          this._setToken(token[n], data, headers, query, localType)
        }
      } else if (type == 'object') {
        for (let n in token) {
          this._setToken(n, data, headers, query, localType, token[n])
        }
      }
    }
  }
  _getTokenNext(target, origin, prop) {
    target.require = origin.require
    if (origin.getData) {
      target.data = origin.getData()
    } else {
      target.data = origin.data
    }
    if (!target.data) {
      this.getToken(prop)
    }
    target.location = origin.location || defaultOpt.location
    target.post = origin.post || defaultOpt.post
  }
  _getToken(prop, tokendata) {
    let res = {
    }
    if (!tokendata) {
      if (this.token.data[prop]) {
        this._getTokenNext(res, this.token.data[prop], prop)
      }
    } else {
      let type = _utils.getType(tokendata)
      if (type == 'string') {
        res.require = false
        res.data = tokendata
        res.location = defaultOpt.location
        res.post = defaultOpt.post
      } else {
        this._getTokenNext(res, tokendata, prop)
      }
    }
    return res
  }
  _setToken(prop, data, headers, query, localType, tokendata) {
    let res = this._getToken(prop, tokendata)
    if (!res.data) {
      if (res.require) {
        console.error('必需的TOKEN无值')
      } else {
        if (res.post == 'unempty') {
          return
        }
      }
    }
    if (res.location == 'body') {
      _utils.appendProp(data, prop, res.data, localType)
    } else if (res.location == 'header') {
      headers[prop] = res.data
    } else if (res.location == 'query') {
      query[prop] = res.data
    }
  }

  getToken(prop) {
    if (!this.token.data[prop].data) {
      let data = _utils.getLocalTemp(this._countTokenName(prop))
      if (data) {
        this.setToken(prop, data, true)
      }
    }
    return this.token.data[prop].data
  }
  setToken(prop, data, noset) {
    if (!this.token.data[prop]) {
      this.token.data[prop] = {}
    }
    this.token.data[prop].data = data
    if (!noset) {
      _utils.setLocalTemp(this._countTokenName(prop), data)
    }
  }
  _countTokenName (prop) {
    return `${this.prop}-${prop}`
  }

  toString() {
    return 'AjaxRule'
  }
}

export default AjaxRule
