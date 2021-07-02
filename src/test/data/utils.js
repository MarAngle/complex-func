// type
import checkComplex from './../../data/type/checkComplex'
import getTag from './../../data/type/getTag'
import getType from './../../data/type/getType'
import isArray from './../../data/type/isArray'
import isBlob from './../../data/type/isBlob'
import isComplex from './../../data/type/isComplex'
import isDate from './../../data/type/isDate'
import isEmptyObject from './../../data/type/isEmptyObject'
import isError from './../../data/type/isError'
import isFile from './../../data/type/isFile'
import isPromise from './../../data/type/isPromise'
import isRegExp from './../../data/type/isRegExp'
// type
// number
import getNum from './../../data/number/getNum'
import getRandomNum from './../../data/number/getRandomNum'
// number
// string
import fillString from './../../data/string/fillString'
import findTargetInStr from './../../data/string/findTargetInStr'
import findTargetInStrNext from './../../data/string/findTargetInStrNext'
import getRandomData from './../../data/string/getRandomData'
import getRandomInList from './../../data/string/getRandomInList'
import getRandomLetter from './../../data/string/getRandomLetter'
import strCodeNum from './../../data/string/strCodeNum'
// string
// object
import appendProp from './../../data/object/appendProp'
import arrayClearOther from './../../data/object/arrayClearOther'
import choiceProp from './../../data/object/choiceProp'
import clearArray from './../../data/object/clearArray'
import deepClone from './../../data/object/deepClone'
import deepCloneData from './../../data/object/deepCloneData'
import deepCloneDataWithOption from './../../data/object/deepCloneDataWithOption'
import defineDeepReactive from './../../data/object/defineDeepReactive'
import defineDeepWatch from './../../data/object/defineDeepWatch'
import defineReactive from './../../data/object/defineReactive'
import defineWatch from './../../data/object/defineWatch'
import formatDataByType from './../../data/object/formatDataByType'
import formatList from './../../data/object/formatList'
import formatTree from './../../data/object/formatTree'
import formatTreeNext from './../../data/object/formatTreeNext'
import formatUpdateDataOption from './../../data/object/formatUpdateDataOption'
import getProp from './../../data/object/getProp'
import getPropByList from './../../data/object/getPropByList'
import hasProp from './../../data/object/hasProp'
import jsonToForm from './../../data/object/jsonToForm'
import mergeData from './../../data/object/mergeData'
import orderArrayByProp from './../../data/object/orderArrayByProp'
import setDefaultData from './../../data/object/setDefaultData'
import setProp from './../../data/object/setProp'
import setPropByList from './../../data/object/setPropByList'
import setPropByType from './../../data/object/setPropByType'
import showArrayProp from './../../data/object/showArrayProp'
import updateData from './../../data/object/updateData'
import updateDataWidthOption from './../../data/object/updateDataWidthOption'
import updateList from './../../data/object/updateList'
// object
// function
import runFunction from './../../data/function/runFunction'
import triggerFunc from './../../data/function/triggerFunc'
import triggerPromise from './../../data/function/triggerPromise'
// function
// utils加载
import debounce from './../../data/utils/debounce'
import downloadBlob from './../../data/utils/downloadBlob'
import downloadFile from './../../data/utils/downloadFile'
import downloadFileByAnchor from './../../data/utils/downloadFileByAnchor'
import encodeURI from './../../data/utils/encodeURI'
import formatQueryUrl from './../../data/utils/formatQueryUrl'
import getLimitData from './../../data/utils/getLimitData'
import getQueryData from './../../data/utils/getQueryData'
import getQueryUrl from './../../data/utils/getQueryUrl'
import loadContents from './../../data/utils/loadContents'
import openWindow from './../../data/utils/openWindow'
import printMsg from './../../data/utils/printMsg'
import printMsgAct from './../../data/utils/printMsgAct'
import showJson from './../../data/utils/showJson'
import throttle from './../../data/utils/throttle'
import transformFile from './../../data/utils/transformFile'
import trimData from './../../data/utils/trimData'
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
