import axios from 'axios'
import _utils from './../data/utils'
import _notice from '@/mainnotice/index'
import AjaxRule from './AjaxRule'


console.log('无法匹配AjaxRule时自动调用default AjaxRule，default不存在是默认第一个rule为default')
class Require {
  constructor({ option, api, formatUrl, rule }) {
    this._funclist = ['setToken', 'getToken', 'ajax', 'require', 'post', 'postform', 'postfile', 'get']
    this.option = {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      resType: 'json' // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    }
    this.api = {
      type: 'line',
      line: 'default',
      url: {
        current: '',
        line: {
          default: '',
          dev: '',
          test: '',
          prod: ''
        },
        local: ''
      }
    }
    this.rule = {}
    this._initOption(option)
    this._initApi(api)
    this._initFormatUrl(formatUrl)
    this._initRule(rule)
    this.buildApi()
  }
  _initOption(option) {
    if (option) {
      if (option.headers) {
        this.option.headers = option.headers
      }
      if (option.resType) {
        this.option.resType = option.resType
      }
    }
  }
  _initApi(api) {
    if (api) {
      this.api.url = api
    }
  }
  _initFormatUrl(formatUrl) {
    if (formatUrl === true) {
      this.formatUrl = function(url, perurl) {
        if (url.indexOf('https://') == 0 || url.indexOf('http://') == 0) {
          // url = url
        } else {
          if (this.env == 'production') { // 生产环境
            url = perurl + url
          } else { // 开发环境
            url = perurl + url
          }
        }
        return url
      }
    } else if (formatUrl) {
      this.formatUrl = formatUrl.bind(this)
    }
  }
  _initRule(rule) {
    for (let n in rule) {
      let item = rule[n]
      this.rule[item.prop] = new AjaxRule(item)
    }
    if (!this.rule.default) {
      this.rule.default = rule[0]
    }
  }
  buildApi() {
    if (process.env.NODE_ENV == 'development') {
      this.api.type = 'local'
      this.api.url.current = this.api.url[this.api.type]
    } else {
      this.api.type = 'line'
      this.api.line = process.env.VUE_APP_APITYPE || 'default'
      this.api.url.current = this.api.url[this.api.type][this.api.line]
    }
    if (!this.api.url.current) {
      this.api.url.current = ''
    }
    console.log(`当前默认链接前缀为[${this.api.url.current}]`)
  }
  _checkAjaxRule(url) {
    for (let n in this.rule) {
      let fg = this.rule[n].checkUrl(url)
      if (fg) {
        return this.rule[n]
      }
    }
    return this.rule.default
  }
  _formatUrl(url) {
    if (this.formatUrl) {
      return this.formatUrl(url, this.api.url.current)
    } else {
      return url
    }
  }
  _formatQuery(url, query) {
    if (query) {
      url = _utils.formatQueryUrl(url, query)
    }
    return url
  }
  ajax(requireData) {
    // console.log(requireData)
    return new Promise((resolve, reject) => {
      axios(requireData).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  require({
    method = 'post',
    url,
    data = {},
    token,
    headers = {},
    query = {},
    dataType = 'json',
    localType = 'json',
    msg,
    resType
  }) {
    return new Promise((resolve, reject) => {
      headers['Content-Type'] = this.option.headers['Content-Type']
      if (!resType) {
        resType = this.option.resType
      }
      url = this._formatUrl(url)
      let ruleData = this._checkAjaxRule(url)
      url = ruleData.formatUrl(url)
      ruleData.formatToken(token, data, headers, query, localType)
      url = this._formatQuery(url, query)
      if (dataType == 'formdata') {
        headers['Content-Type'] = 'multipart/form-data'
        if (localType == 'json') {
          data = _utils.jsonToForm(data)
        }
      } else if (dataType == 'json') {
        data = JSON.stringify(data)
      }
      let RequireData = {
        method: method,
        url: url,
        data: data,
        responseType: resType,
        headers: headers
      }
      this.ajax(RequireData).then(res => {
        if (RequireData.responseType == 'blob') {
          resolve({
            status: 'success',
            data: res
          })
        } else {
          let nextdata = ruleData.check(res.data, RequireData)
          if (nextdata.status == 'success') {
            resolve(nextdata)
          } else if (nextdata.status == 'login') {
            this.autoShowMsg(msg, nextdata.msg, 'error')
            reject(nextdata)
          } else if (nextdata.status == 'fail') {
            this.autoShowMsg(msg, nextdata.msg, 'error')
            reject(nextdata)
          }
        }
      }, error => {
        console.error(error)
        this.autoShowMsg(msg, '服务器请求错误，请刷新重试或联系管理员', 'error', '警告')
        reject({
          status: 'fail',
          code: 'server error',
          error: error,
          msg: '服务器请求错误，请刷新重试或联系管理员',
          RequireData: RequireData
        })
      })
    })
  }
  autoShowMsg(msgact, content, type, title) {
    if (!msgact) {
      msgact = {
        show: true,
        content: false,
        type: false,
        title: false
      }
    } else if (msgact == 'hidden') {
      msgact = {
        show: false
      }
    }
    if (msgact.show) {
      if (msgact.content) {
        content = msgact.content
      }
      if (msgact.type) {
        type = msgact.type
      }
      if (msgact.title) {
        title = msgact.title
      }
      _notice.showmsg(content, type, title)
    }
  }
  post(payload) {
    return new Promise((resolve, reject) => {
      payload.method = 'post'
      this.require(payload).then(function (res) {
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
  }
  postform(payload) {
    return new Promise((resolve, reject) => {
      payload.method = 'post'
      payload.dataType = 'formdata'
      this.require(payload).then(function (res) {
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
  }
  postfile(payload) {
    return new Promise((resolve, reject) => {
      payload.method = 'post'
      payload.dataType = 'formdata'
      payload.localType = 'formdata'
      this.require(payload).then(function (res) {
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
  }
  get(payload) {
    return new Promise((resolve, reject) => {
      payload.method = 'get'
      this.require(payload).then(function (res) {
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
  }

  setToken(prop, data, rule = 'default') {
    if (this.rule[rule]) {
      this.rule[rule].setToken(prop, data)
    } else {
      console.error('未找到对应的连接处理程序')
    }
  }
  getToken(prop, rule = 'default') {
    if (this.rule[rule]) {
      return this.rule[rule].getToken(prop)
    } else {
      console.error('未找到对应的连接处理程序')
    }
  }

  toString() {
    return 'require'
  }
}

export default Require
