
import runText from '../../main'
import defineReactive from '../../../data/reactive/defineReactive'
import defineWatch from '../../../data/reactive/defineWatch'
import observe from '../../../data/reactive/observe'
import Watcher from '../../../data/reactive/Watcher'

runText(function({ checkSame, showError }) {
  const name = 'name'
  const newName = 'newName'
  let data = {
    user: {
      id: 1,
      name: name
    }
  }
  defineReactive(data.user, 'name', {
    get: function(val) {
      if (val !== newName) {
        showError('获取失败')
      }
    },
    set: function(val, oldVal) {
      if (val !== newName || oldVal !== name) {
        showError('拦截失败')
      }
    }
  })
  data.user.name = newName
  let currentName = data.user.name
}, 'defineReactive')

runText(function({ checkSame, showError }) {
  let data = {
    id: 'id',
    user: {
      id: 'uid',
      name: 'uname',
      parent: {
        id: 'pid',
        name: 'pname'
      }
    }
  }
  console.log(observe(data))
  let w = new Watcher(data, 'user.id', (val, oldVal) => {
    console.log(val, oldVal)
  })
  let n = new Watcher(data, 'user.parent', (val, oldVal) => {
    console.log('p', val, oldVal)
  })
  data.user.id = 'uis'
  data.user.parent.id = 'uis'
}, 'observe')
