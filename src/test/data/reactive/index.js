
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
  observe(data)
  let watchUserIdTemp
  let watchUserId = new Watcher(data, 'user.id', (val, oldVal) => {
    watchUserIdTemp = {
      val,
      oldVal
    }
  })
  data.user.id = 'newid'
  setTimeout(() => {
    checkSame(watchUserIdTemp, {
      val: 'newid',
      oldVal: 'uid'
    }, 'observe的watch失败')
    watchUserId.stop()
  }, 0)

  let watchUserParentTemp = {}
  let watchUserParent = new Watcher(data.user, 'parent', {
    deep: true,
    handler: (val, oldVal) => {
      if (watchUserParentTemp) {
        watchUserParentTemp.val = val
      } else {
        showError('stop后触发了watch！')
      }
    }
  })
  data.user.parent.id = 'newpid'
  setTimeout(() => {
    checkSame(watchUserParentTemp, {
      val: {
        id: 'newpid',
        name: 'pname'
      }
    }, 'observe的deep watch失败')
    watchUserParentTemp = null
    watchUserParent.stop()
    data.user.parent.id = 'puis+++'
  }, 0)
}, 'observe')
