import test from './../main/index'
import utils from './../../data/utils'

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
  utils.updateData(targetdata, origindata)
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
  utils.updateData(targetdata, origindata, {
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
    utils.deepClone(obj, true)
    utils.deepClone(obj, {})
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
  utils.updateList(list, list2, {
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

  utils.triggerPromise({
    func: function() {},
    args: [],
    error: (code) => {
      if (code != 'notPromise') {
        console.error('triggerPromise错误')
      }
    }
  })
  utils.triggerPromise({
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

  utils.runFunction(baseFunction, ['base'], function(res) {
    if (res.data != 'base') {
      console.error('runFunction错误', res)
    }
  })
  utils.runFunction(promiseFunction, ['promise'], function(res) {
    if (res.data.name != 'promise') {
      console.error('runFunction错误', res)
    }
  })
})();
