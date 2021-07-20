
import text from '../../main';
import updateData from './../../../data/object/updateData'
import deepClone from './../../../data/object/deepClone'
import mergeData from '../../../data/object/mergeData';

text(function() {
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
});
text(function() {
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
});

text(function() {
  // 拷贝相关
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
}, '深拷贝的循环引用报错');

text(function() {
  // 拷贝相关
  let data = {
    name: 'id',
    prop: 'id',
    mod: {
      list: {
        width: 100,
        option: {
          min: 0,
          list: [1, 2, 3],
          objectList: [
            {
              name: 1
            },
            {
              name: 2
            }
          ]
        }
      },
      edit: {
        option: {
          name: 'name'
        }
      }
    }
  }
  let newdata = updateData(data, {
    name: 'ID',
    originprop: 'userId',
    mod: {
      list: {
        local: true,
        option: {
          min: 1,
          max: 100,
          objectList: [1, {
            name: '111'
          }]
        }
      },
      build: {
        option: {
          name: 'build'
        }
      }
    }
  })
  console.log(newdata)
});
