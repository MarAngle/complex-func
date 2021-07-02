// // type
// import checkComplex from './data/utils/checkComplex'
// import getTag from './data/utils/getTag'
// import getType from './data/type/getType'
// import isArray from './data/utils/isArray'
// import isBlob from './data/utils/isBlob'
// import isComplex from './data/utils/isComplex'
// import isDate from './data/utils/isDate'
// import isEmptyObject from './data/utils/isEmptyObject'
// import isError from './data/utils/isError'
// import isFile from './data/utils/isFile'
// import isPromise from './data/utils/isPromise'
// import isRegExp from './data/utils/isRegExp'
// // type
// // number
// import getNum from './data/utils/getNum'
// import getRandomNum from './data/utils/getRandomNum'
// // number
// // string
// import fillString from './data/utils/fillString'
// import findTargetInStr from './data/utils/findTargetInStr'
// import findTargetInStrNext from './data/utils/findTargetInStrNext'
// import strCodeNum from './data/utils/strCodeNum'
// // string
// // object
// import appendProp from './data/utils/appendProp'
// import arrayClearOther from './data/utils/arrayClearOther'
// import choiceProp from './data/utils/choiceProp'
// import clearArray from './data/utils/clearArray'
// import deepClone from './data/utils/deepClone'
// import deepCloneData from './data/utils/deepCloneData'
// import deepCloneDataWithOption from './data/utils/deepCloneDataWithOption'
// import formatList from './data/utils/formatList'
// import formatTree from './data/utils/formatTree'
// import formatTreeNext from './data/utils/formatTreeNext'
// import formatUpdateDataOption from './data/utils/formatUpdateDataOption'
// import getProp from './data/utils/getProp'
// import getPropByList from './data/utils/getPropByList'
// import hasProp from './data/utils/hasProp'
// import jsonToForm from './data/utils/jsonToForm'
// import mergeData from './data/utils/mergeData'
// import orderArrayByProp from './data/utils/orderArrayByProp'
// import setDefaultData from './data/utils/setDefaultData'
// import setProp from './data/utils/setProp'
// import setPropByList from './data/utils/setPropByList'
// import setPropByType from './data/utils/setPropByType'
// import showArrayProp from './data/utils/showArrayProp'
// import updateData from './data/utils/updateData'
// import updateDataWidthOption from './data/utils/updateDataWidthOption'
// import updateList from './data/utils/updateList'

// // object
// // function
// import runFunction from './data/utils/runFunction'
// import triggerFunc from './data/utils/triggerFunc'
// import triggerPromise from './data/utils/triggerPromise'

// // function

// // utils加载
// import debounce from './data/utils/debounce'

// import defineDeepReactive from './data/utils/defineDeepReactive'
// import defineDeepWatch from './data/utils/defineDeepWatch'
// import defineReactive from './data/utils/defineReactive'
// import defineWatch from './data/utils/defineWatch'
// import downloadBlob from './data/utils/downloadBlob'
// import downloadFile from './data/utils/downloadFile'
// import downloadFileByAnchor from './data/utils/downloadFileByAnchor'
// import encodeURI from './data/utils/encodeURI'
// import formatDataByType from './data/utils/formatDataByType'

// import formatQueryUrl from './data/utils/formatQueryUrl'

// import getLimitData from './data/utils/getLimitData'

// import getQueryData from './data/utils/getQueryData'
// import getQueryUrl from './data/utils/getQueryUrl'
// import getRandomData from './data/utils/getRandomData'
// import getRandomInList from './data/utils/getRandomInList'
// import getRandomLetter from './data/utils/getRandomLetter'

// import loadContents from './data/utils/loadContents'

// import openWindow from './data/utils/openWindow'

// import printMsg from './data/utils/printMsg'
// import printMsgAct from './data/utils/printMsgAct'

// import showJson from './data/utils/showJson'
// import throttle from './data/utils/throttle'
// import transformFile from './data/utils/transformFile'
// import trimData from './data/utils/trimData'

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

// import './test/index'
import './buildContentImport'

let requiredata

let mainfunc = {
  current: current,
  data: {},
  // utils
  // appendProp,
  // arrayClearOther,
  // checkComplex,
  // choiceProp,
  // clearArray,
  // debounce,
  // deepClone,
  // deepCloneData,
  // deepCloneDataWithOption,
  // defineDeepReactive,
  // defineDeepWatch,
  // defineReactive,
  // defineWatch,
  // downloadBlob,
  // downloadFile,
  // downloadFileByAnchor,
  // encodeURI,
  // fillString,
  // findTargetInStr,
  // findTargetInStrNext,
  // formatDataByType,
  // formatList,
  // formatQueryUrl,
  // formatTree,
  // formatTreeNext,
  // formatUpdateDataOption,
  // getLimitData,
  // getNum,
  // getProp,
  // getPropByList,
  // getQueryData,
  // getQueryUrl,
  // getRandomData,
  // getRandomInList,
  // getRandomLetter,
  // getRandomNum,
  // getTag,
  // getType,
  // hasProp,
  // isArray,
  // isBlob,
  // isComplex,
  // isDate,
  // isEmptyObject,
  // isError,
  // isFile,
  // isPromise,
  // isRegExp,
  // jsonToForm,
  // loadContents,
  // mergeData,
  // openWindow,
  // orderArrayByProp,
  // printMsg,
  // printMsgAct,
  // runFunction,
  // setDefaultData,
  // setProp,
  // setPropByList,
  // setPropByType,
  // showArrayProp,
  // showJson,
  // strCodeNum,
  // throttle,
  // transformFile,
  // triggerFunc,
  // triggerPromise,
  // trimData,
  // updateData,
  // updateDataWidthOption,
  // updateList,
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
