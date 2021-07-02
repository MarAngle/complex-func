// utils加载
import appendProp from './../../data/utils/appendProp'
import arrayClearOther from './../../data/utils/arrayClearOther'
import buildLocalDataName from './../../data/utils/buildLocalDataName'
import checkComplex from './../../data/utils/checkComplex'
import choiceProp from './../../data/utils/choiceProp'
import clearArray from './../../data/utils/clearArray'
import debounce from './../../data/utils/debounce'
import deepClone from './../../data/utils/deepClone'
import deepCloneData from './../../data/utils/deepCloneData'
import deepCloneDataWithOption from './../../data/utils/deepCloneDataWithOption'
import defineDeepReactive from './../../data/utils/defineDeepReactive'
import defineDeepWatch from './../../data/utils/defineDeepWatch'
import defineReactive from './../../data/utils/defineReactive'
import defineWatch from './../../data/utils/defineWatch'
import downloadBlob from './../../data/utils/downloadBlob'
import downloadFile from './../../data/utils/downloadFile'
import downloadFileByAnchor from './../../data/utils/downloadFileByAnchor'
import encodeURI from './../../data/utils/encodeURI'
import fillString from './../../data/utils/fillString'
import findTargetInStr from './../../data/utils/findTargetInStr'
import findTargetInStrNext from './../../data/utils/findTargetInStrNext'
import formatDataByType from './../../data/utils/formatDataByType'
import formatList from './../../data/utils/formatList'
import formatQueryUrl from './../../data/utils/formatQueryUrl'
import formatTree from './../../data/utils/formatTree'
import formatTreeNext from './../../data/utils/formatTreeNext'
import formatUpdateDataOption from './../../data/utils/formatUpdateDataOption'
import getLimitData from './../../data/utils/getLimitData'
import getLocalData from './../../data/utils/getLocalData'
import getNum from './../../data/utils/getNum'
import getProp from './../../data/utils/getProp'
import getPropByList from './../../data/utils/getPropByList'
import getQueryData from './../../data/utils/getQueryData'
import getQueryUrl from './../../data/utils/getQueryUrl'
import getRandomData from './../../data/utils/getRandomData'
import getRandomInList from './../../data/utils/getRandomInList'
import getRandomLetter from './../../data/utils/getRandomLetter'
import getRandomNum from './../../data/utils/getRandomNum'
import getTag from './../../data/utils/getTag'
import getType from './../../data/type/getType'
import hasProp from './../../data/utils/hasProp'
import isArray from './../../data/utils/isArray'
import isBlob from './../../data/utils/isBlob'
import isComplex from './../../data/utils/isComplex'
import isDate from './../../data/utils/isDate'
import isEmptyObject from './../../data/utils/isEmptyObject'
import isError from './../../data/utils/isError'
import isFile from './../../data/utils/isFile'
import isPromise from './../../data/utils/isPromise'
import isRegExp from './../../data/utils/isRegExp'
import jsonToForm from './../../data/utils/jsonToForm'
import loadContents from './../../data/utils/loadContents'
import mergeData from './../../data/utils/mergeData'
import openWindow from './../../data/utils/openWindow'
import orderArrayByProp from './../../data/utils/orderArrayByProp'
import printMsg from './../../data/utils/printMsg'
import printMsgAct from './../../data/utils/printMsgAct'
import removeLocalData from './../../data/utils/removeLocalData'
import runFunction from './../../data/utils/runFunction'
import setDefaultData from './../../data/utils/setDefaultData'
import setLocalData from './../../data/utils/setLocalData'
import setLocalDataPre from './../../data/utils/setLocalDataPre'
import setProp from './../../data/utils/setProp'
import setPropByList from './../../data/utils/setPropByList'
import setPropByType from './../../data/utils/setPropByType'
import showArrayProp from './../../data/utils/showArrayProp'
import showJson from './../../data/utils/showJson'
import strCodeNum from './../../data/utils/strCodeNum'
import throttle from './../../data/utils/throttle'
import transformFile from './../../data/utils/transformFile'
import triggerFunc from './../../data/utils/triggerFunc'
import triggerPromise from './../../data/utils/triggerPromise'
import trimData from './../../data/utils/trimData'
import updateData from './../../data/utils/updateData'
import updateDataWidthOption from './../../data/utils/updateDataWidthOption'
import updateList from './../../data/utils/updateList'
// utils加载完成

(function() {
  // 拷贝相关
  let targetdata = {
    name: 'target',
    data: {
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ]
    }
  }
  let origindata = {
    name: 'origin',
    data: {
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
  }
  updateData(targetdata, origindata)
  if (targetdata.name != 'origin' || targetdata.data.list[0].name != '11' || targetdata.data.list[1].id != 3) {
    console.error('UpdateData未成功')
  }
})();
(function() {
  // 拷贝相关
  let targetdata = {
    name: 'target',
    data: {
      name: 't',
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ]
    }
  }
  let origindata = {
    name: 'origin',
    data: {
      name: 's',
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
  }
  updateData(targetdata, origindata, {
    limit: {
      list: ['data.name']
    },
    depth: 2
  })
  if (targetdata.data.name != 't') {
    console.log(targetdata, origindata)
    console.error('UpdateData属性限制未成功')
  }
  if (targetdata.data.list !== origindata.data.list) {
    console.error('UpdateData深度限制未成功')
  }
})();

(function() {
  // 拷贝相关
  try {
    let obj = {
      a: 1,
      b: [1, 2, 3],
      c: {
        h: 20
      },
      d: () => {}
    }
    obj.b.push(obj.c)
    obj.c.j = obj.b
    deepClone(obj, true)
    deepClone(obj, {})
  } catch (e) {
    console.error('深拷贝的循环引用报错', e)
  }
})();

(function() {
  // updateList相关
  let list = [
    {
      id: '1',
      name: 'a'
    },
    {
      id: '2',
      name: 'b'
    }
  ]
  let list2 = [
    {
      id: '1',
      name: 'a1'
    },
    {
      id: '3',
      name: 'c'
    }
  ]
  updateList(list, list2, {
    check: 'id',
    update: function(targetItem, originItem) {
      targetItem.name = originItem.name
      if (targetItem.id != '1') {
        console.error('UpdateList中update判断未成功')
      }
    },
    format: function(targetItem) {
      if (targetItem.id != '3') {
        console.error('UpdateList中format判断未成功')
      }
      return targetItem
    },
    destroy: function(targetItem) {
      if (targetItem.id != '2') {
        console.error('UpdateList中destroy判断未成功')
      }
    }
  })
  if (list.length != 2 || list[0].name != 'a1' || list[1].id != '3') {
    console.error('UpdateList未成功')
  }
})();

(function() {
  let baseFunction = function(name) {
    return name
  }
  let promiseFunction = function(name) {
    return new Promise((resolve, reject) => {
      resolve({ name: name })
    })
  }

  triggerPromise({
    func: function() {},
    args: [],
    error: (code) => {
      if (code != 'notPromise') {
        console.error('triggerPromise错误')
      }
    }
  })
  triggerPromise({
    func: promiseFunction,
    args: ['promise'],
    error: (code) => {
      console.error('triggerPromise错误')
    },
    start: () => {
    },
    success: (res) => {
      if (res.name != 'promise') {
        console.error('triggerPromise错误')
      }
    },
    fail: (res) => {
      console.error('triggerPromise错误', res)
    }
  })

  runFunction(baseFunction, ['base'], function(res) {
    if (res.data != 'base') {
      console.error('runFunction错误', res)
    }
  })
  runFunction(promiseFunction, ['promise'], function(res) {
    if (res.data.name != 'promise') {
      console.error('runFunction错误', res)
    }
  })
})();
