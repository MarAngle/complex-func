import axios from 'axios'
import RequireRule from './RequireRule'
import { getEnv } from './../data/environment/index'
import noticeData from './../option/noticeData'
import jsonToForm from './../data/utils/jsonToForm'
import printMsgAct from './../data/utils/printMsgAct'

/*
option:
headers
responseType
timeout
*/
class Require {
  constructor ({ api, option, rule, status }) {
    this.api = {
      baseURL: ''
    }
    this.rule = {}
    this.status = {
      403: '拒绝访问!',
      404: '很抱歉，资源未找到!',
      504: '网络超时!'
    }
    this.list = []
    this.initApi(api)
    this.initService(option)
    this.initRule(rule)
    this.initStatus(status)
  }
  // 加载api
  initApi (api) {
    if (api.baseURL) {
      this.api.baseURL = api.baseURL
    }
  }
  // 创建option
  buildOption (option = {}) {
    if (!option.headers) {
      option.headers = {}
    }
    if (!option.headers['Content-Type']) {
      option.headers['Content-Type'] = 'text/plain;charset=UTF-8'
    }
    return option
  }
  // 构建service
  buildService(option) {
    return axios.create(this.buildOption(option))
  }
  // 创建service
  initService (option) {
    this.service = this.buildService(option)
  }
  // 加载规则
  initRule (rule) {
    let firstProp
    for (let n in rule) {
      let ruleOption = rule[n]
      this.rule[ruleOption.prop] = new RequireRule(ruleOption)
      if (!firstProp) {
        firstProp = ruleOption.prop
      }
    }
    if (!this.rule.default) {
      this.rule.default = this.rule[firstProp]
    }
    if (getEnv('real') == 'development') {
      this.printMsg(`默认的请求规则处理程序为[${this.rule.default._selfName()}]`, 'log')
    }
  }
  // 加载状态翻译值
  initStatus (status = {}) {
    for (let n in status) {
      this.status[n] = status[n]
    }
  }
  // 检查获取当前url对应的rule
  checkRule (url) {
    for (let n in this.rule) {
      let fg = this.rule[n].checkUrl(url)
      if (fg) {
        return this.rule[n]
      }
    }
    return this.rule.default
  }
  // 格式化URL
  _formatUrl (url) {
    if (this.formatUrl) {
      return this.formatUrl(url, this.api.baseURL)
    } else {
      if (this.api.baseURL && url.indexOf('https://') != 0 && url.indexOf('http://') != 0) {
        // 当前URL不以http/https开始，则认为此URL需要添加默认前缀
        url = this.api.baseURL + url
      }
      return url
    }
  }
  // 调用service进行axios请求
  ajax (optionData = {}) {
    return new Promise((resolve, reject) => {
      this.service(optionData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 传参检查和格式化
  // url,
  // data = {},
  // params = {},
  // headers = {},
  // token,
  // requestDataType = 'json',
  // requestCurrentDataType = 'json'
  // responseFormat = true
  // responseType = 'json'
  // responseFormat = true
  check (optionData) {
    let check = {
      next: true,
      code: '',
      msg: ''
    }
    // 检查参数
    if (!optionData) {
      check.next = false
      check.code = 'undefined optionData'
      check.msg = '未定义请求数据'
    }
    // 检查URL
    if (check.next) {
      optionData.url = this._formatUrl(optionData.url)
      if (!optionData.url) {
        check.next = false
        check.code = 'undefined URL'
        check.msg = '未定义请求地址'
      }
    }
    // 检查RULE
    let ruleItem
    if (check.next) {
      ruleItem = this.checkRule(optionData.url)
      if (!ruleItem) {
        check.next = false
        check.code = 'undefined rule'
        check.msg = '未检索到对应规则'
      }
    }
    // 添加默认值
    if (!optionData.data) {
      optionData.data = {}
    }
    if (!optionData.params) {
      optionData.params = {}
    }
    if (!optionData.headers) {
      optionData.headers = {}
    }
    if (!optionData.requestDataType) {
      optionData.requestDataType = 'json'
    }
    if (!optionData.requestCurrentDataType) {
      optionData.requestCurrentDataType = 'json'
    }
    if (!optionData.responseType) {
      optionData.responseType = 'json'
    }
    if (optionData.responseFormat === undefined) {
      optionData.responseFormat = true
    }
    // RULE NEXT
    if (check.next) {
      let ruleCheck = ruleItem.format(optionData)
      if (ruleCheck && !ruleCheck.next) {
        check.next = false
        check.code = ruleCheck.code
        check.msg = ruleCheck.msg
        ruleItem.tokenFail(ruleCheck.prop)
      } else {
        check.ruleItem = ruleItem
      }
    }
    return check
  }
  // 请求，自动化处理
  require (optionData) {
    return new Promise((resolve, reject) => {
      let check = this.check(optionData)
      if (check.next) {
        if (optionData.requestDataType == 'formdata') {
          optionData.headers['Content-Type'] = 'multipart/form-data'
          if (optionData.requestCurrentDataType == 'json') {
            optionData.data = jsonToForm(optionData.data)
          }
        } else if (optionData.requestDataType == 'json') {
          optionData.data = JSON.stringify(optionData.data)
        }
        this.requireNext(optionData, check).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      } else {
        this.showFailMsg(optionData.failMsg, check.msg, 'error')
        reject({ status: 'fail', ...check })
      }
    })
  }
  // 请求下一步操作
  requireNext (optionData, check) {
    return new Promise((resolve, reject) => {
      this.ajax(optionData).then(response => {
        if (optionData.responseFormat && optionData.responseType == 'json') {
          let nextdata = check.ruleItem.check(response, optionData)
          if (nextdata.status == 'success') {
            resolve(nextdata)
          } else if (nextdata.status == 'login') {
            this.showFailMsg(optionData.failMsg, nextdata.msg, 'error')
            reject(nextdata)
          } else if (nextdata.status == 'fail') {
            this.showFailMsg(optionData.failMsg, nextdata.msg, 'error')
            reject(nextdata)
          }
        } else if (!optionData.responseFormat) {
          resolve({
            status: 'success',
            code: 'unFormat',
            data: response
          })
        } else {
          resolve({
            status: 'success',
            code: 'unJson',
            data: response
          })
        }
      }, error => {
        console.error(error)
        let errRes = this.requireFail(error, optionData, check.ruleItem)
        this.showFailMsg(optionData.failMsg, errRes.msg, 'error', '警告')
        reject(errRes)
      })
    })
  }
  // 请求失败回调
  requireFail (error, optionData, ruleItem) {
    let errRes = {
      status: 'fail',
      optionData: optionData,
      error: error
    }
    if (error.response) {
      errRes.code = 'server error'
      let msg = ruleItem.requireFail(errRes)
      if (!msg) {
        msg = this.parseStatus(error.response.status)
        if (!msg) {
          msg = '服务器请求失败，请刷新重试或联系管理员！'
        }
      }
      if (errRes.msg === undefined) {
        errRes.msg = msg
      }
    } else {
      errRes.code = 'require error'
      errRes.msg = '服务器请求失败，请刷新重试或联系管理员！'
    }
    return errRes
  }
  // 获取status翻译值
  parseStatus (status) {
    if (status && this.status[status]) {
      return this.status[status]
    } else {
      return ''
    }
  }
  // 自动显示失败msg
  showFailMsg (msgOption, content, type, title) {
    if (msgOption === undefined || msgOption === true) {
      msgOption = {
        show: true,
        content: false,
        type: false,
        title: false
      }
    } else if (!msgOption) {
      msgOption = {
        show: false
      }
    }
    if (msgOption.show) {
      if (msgOption.content) {
        content = msgOption.content
      }
      if (msgOption.type) {
        type = msgOption.type
      }
      if (msgOption.title) {
        title = msgOption.title
      }
      if (content) {
        noticeData.showmsg(content, type, title)
      }
    }
  }
  // get请求
  get (optionData = {}) {
    optionData.method = 'get'
    return this.require(optionData)
  }
  // post请求
  post (optionData = {}) {
    optionData.method = 'post'
    return this.require(optionData)
  }
  // post请求=>json转换成formdata
  postform (optionData = {}) {
    optionData.method = 'post'
    optionData.requestDataType = 'formdata'
    return this.require(optionData)
  }
  // post请求=>formdata参数
  postfile (optionData = {}) {
    optionData.method = 'post'
    optionData.requestDataType = 'formdata'
    optionData.requestCurrentDataType = 'formdata'
    return this.require(optionData)
  }
  // token删除
  removeToken (tokenName, prop = 'default') {
    if (this.rule[prop]) {
      return this.rule[prop].removeToken(tokenName)
    } else {
      this.printMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
      return false
    }
  }
  // token设置
  setToken (tokenName, data, prop = 'default') {
    if (this.rule[prop]) {
      this.rule[prop].setToken(tokenName, data)
    } else {
      this.printMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
    }
  }
  // token获取
  getToken (tokenName, prop = 'default') {
    if (this.rule[prop]) {
      return this.rule[prop].getToken(tokenName)
    } else {
      this.printMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
      return false
    }
  }

  _selfName () {
    let ruleName = []
    for (let n in this.rule) {
      ruleName.push(this.rule[n]._selfName())
    }
    return `(${this.constructor.name}:[${ruleName.join(',')}])`
  }
  printMsg(info, type = 'error', option) {
    printMsgAct(this._selfName() + ':' + info, type, option)
  }
  toString() {
    return this._selfName()
  }
}

export default Require
