// type
import checkComplex from './data/type/checkComplex'
import getTag from './data/type/getTag'
import getType from './data/type/getType'
import isArray from './data/type/isArray'
import isBlob from './data/type/isBlob'
import isComplex from './data/type/isComplex'
import isDate from './data/type/isDate'
import isEmptyObject from './data/type/isEmptyObject'
import isError from './data/type/isError'
import isFile from './data/type/isFile'
import isPromise from './data/type/isPromise'
import isRegExp from './data/type/isRegExp'
// type
// number
import getNum from './data/number/getNum'
import getRandomNum from './data/number/getRandomNum'
// number
// string
import fillString from './data/string/fillString'
import findTargetInStr from './data/string/findTargetInStr'
import findTargetInStrNext from './data/string/findTargetInStrNext'
import getRandomData from './data/string/getRandomData'
import getRandomInList from './data/string/getRandomInList'
import getRandomLetter from './data/string/getRandomLetter'
import strCodeNum from './data/string/strCodeNum'
// string
// object
import appendProp from './data/object/appendProp'
import arrayClearOther from './data/object/arrayClearOther'
import choiceProp from './data/object/choiceProp'
import clearArray from './data/object/clearArray'
import deepClone from './data/object/deepClone'
import deepCloneData from './data/object/deepCloneData'
import deepCloneDataWithOption from './data/object/deepCloneDataWithOption'
import defineDeepReactive from './data/object/defineDeepReactive'
import defineDeepWatch from './data/object/defineDeepWatch'
import defineReactive from './data/object/defineReactive'
import defineWatch from './data/object/defineWatch'
import formatDataByType from './data/object/formatDataByType'
import formatList from './data/object/formatList'
import formatTree from './data/object/formatTree'
import formatTreeNext from './data/object/formatTreeNext'
import formatUpdateDataOption from './data/object/formatUpdateDataOption'
import getProp from './data/object/getProp'
import getPropByList from './data/object/getPropByList'
import hasProp from './data/object/hasProp'
import jsonToForm from './data/object/jsonToForm'
import mergeData from './data/object/mergeData'
import orderArrayByProp from './data/object/orderArrayByProp'
import setDefaultData from './data/object/setDefaultData'
import setProp from './data/object/setProp'
import setPropByList from './data/object/setPropByList'
import setPropByType from './data/object/setPropByType'
import showArrayProp from './data/object/showArrayProp'
import updateData from './data/object/updateData'
import updateDataWidthOption from './data/object/updateDataWidthOption'
import updateList from './data/object/updateList'
// object
// function
import runFunction from './data/function/runFunction'
import triggerFunc from './data/function/triggerFunc'
import triggerPromise from './data/function/triggerPromise'
// function
// utils加载
import debounce from './data/utils/debounce'
import downloadBlob from './data/utils/downloadBlob'
import downloadFile from './data/utils/downloadFile'
import downloadFileByAnchor from './data/utils/downloadFileByAnchor'
import encodeURI from './data/utils/encodeURI'
import formatQueryUrl from './data/utils/formatQueryUrl'
import getLimitData from './data/utils/getLimitData'
import getQueryData from './data/utils/getQueryData'
import getQueryUrl from './data/utils/getQueryUrl'
import loadContents from './data/utils/loadContents'
import openWindow from './data/utils/openWindow'
import printMsg from './data/utils/printMsg'
import printMsgAct from './data/utils/printMsgAct'
import showJson from './data/utils/showJson'
import throttle from './data/utils/throttle'
import transformFile from './data/utils/transformFile'
import trimData from './data/utils/trimData'
// utils加载完成
// local加载
import buildLocalDataName from './data/local/buildLocalDataName'
import getLocalData from './data/local/getLocalData'
import removeLocalData from './data/local/removeLocalData'
import setLocalData from './data/local/setLocalData'
import setLocalDataPre from './data/local/setLocalDataPre'
// local加载完成
// environment加载
import {
  checkUseItem,
  getCanUse,
  getEnv,
  getEnvMode,
  setCanUse,
  setEnv,
  setEnvMode
} from './data/environment/index'
// environment加载完成
// worker加载
import getWorkerContent from './data/worker/getWorkerContent'
import setWorker from './data/worker/setWorker'
import workerDo from './data/worker/workerDo'
// worker加载完成
// rule
import buildRule from './data/rule/buildRule'
import checkRule from './data/rule/checkRule'
// rule加载完成
import current from './data/current'
import Require from './build/Require'
import notice from './option/noticeData'

import './test/index'
// import './buildContentImport'

let requiredata

let mainfunc = {
  current: current,
  data: {},
  // type
  checkComplex,
  getTag,
  getType,
  isArray,
  isBlob,
  isComplex,
  isDate,
  isEmptyObject,
  isError,
  isFile,
  isPromise,
  isRegExp,
  // type
  // number
  getNum,
  getRandomNum,
  // number
  // string
  fillString,
  findTargetInStr,
  findTargetInStrNext,
  getRandomData,
  getRandomInList,
  getRandomLetter,
  strCodeNum,
  // string
  // object
  appendProp,
  arrayClearOther,
  choiceProp,
  clearArray,
  deepClone,
  deepCloneData,
  deepCloneDataWithOption,
  defineDeepReactive,
  defineDeepWatch,
  defineReactive,
  defineWatch,
  formatDataByType,
  formatList,
  formatTree,
  formatTreeNext,
  formatUpdateDataOption,
  getProp,
  getPropByList,
  hasProp,
  jsonToForm,
  mergeData,
  orderArrayByProp,
  setDefaultData,
  setProp,
  setPropByList,
  setPropByType,
  showArrayProp,
  updateData,
  updateDataWidthOption,
  updateList,
  // object
  // function
  runFunction,
  triggerFunc,
  triggerPromise,
  // function
  // utils加载
  debounce,
  downloadBlob,
  downloadFile,
  downloadFileByAnchor,
  encodeURI,
  formatQueryUrl,
  getLimitData,
  getQueryData,
  getQueryUrl,
  loadContents,
  openWindow,
  printMsg,
  printMsgAct,
  showJson,
  throttle,
  transformFile,
  trimData,
  // utils加载完成
  // local
  checkUseItem,
  getCanUse,
  getEnv,
  getEnvMode,
  setCanUse,
  setEnv,
  setEnvMode,
  // environment
  buildLocalDataName,
  getLocalData,
  removeLocalData,
  setLocalData,
  setLocalDataPre,
  // worker
  getWorkerContent,
  setWorker,
  workerDo,
  // rule
  buildRule,
  checkRule
}

mainfunc._initMod = function (mod, methodList) {
  if (methodList) {
    for (let i in methodList) {
      let methodData = methodList[i]
      if (typeof methodData != 'object') {
        methodData = {
          originprop: methodData,
          prop: methodData
        }
      }
      this._appendMethod(methodData.prop, mod[methodData.originprop], mod)
    }
  } else {
    for (let n in mod) {
      if (typeof mod[n] == 'function') {
        this._appendMethod(n, mod[n], mod)
      }
    }
  }
}

mainfunc._appendMethod = function (methodName, methodData, target) {
  let append = false
  if (methodData) {
    let methodType = typeof methodData
    if (methodType == 'function') {
      methodData = {
        data: methodData
      }
      append = true
    } else if (methodType == 'object') {
      append = true
    }
  }
  if (append) {
    if (!this[methodName]) {
      append = true
    } else if (methodData.replace) {
      append = true
      this.printMsg(`appendMethod: ${methodName} is replace`, 'warn')
    } else {
      this.printMsg(`appendMethod: ${methodName} is defined`)
    }
    if (append) {
      if (target) {
        this[methodName] = methodData.data.bind(target)
      } else {
        this[methodName] = methodData.data
      }
    }
  }
}

mainfunc.init = function({
  data, // 数据
  root, // 根对象
  methods, // 方法
  require, // 请求
  notice // 提示
}) {
  if (data) {
    for (let n in data) {
      this.data[n] = data[n]
    }
  }
  if (root) {
    for (let n in root) {
      if (this[n]) {
        this.printMsg(`root属性${n}设置冲突，请检查!`)
      } else {
        this[n] = root[n]
      }
    }
  }
  if (methods) {
    for (let n in methods) {
      this._appendMethod(n, methods[n])
    }
  }
  if (require) {
    this.initRequire(require)
  }
  if (notice) {
    this.initNotice(notice)
  }
}

mainfunc.initRequire = function (requireInitData) {
  requiredata = new Require(requireInitData)
  this._initMod(requiredata, ['ajax', 'require', 'get', 'post', 'postform', 'postfile', 'setToken', 'getToken', 'removeToken'])
}

mainfunc.initNotice = function(noticeInitData = {}) {
  notice.data = noticeInitData.data || {}
  for (let n in noticeInitData.methods) {
    notice[n] = noticeInitData.methods[n]
  }
  mainfunc._initMod(notice)
}

export { requiredata }

export default mainfunc
