
import runText from '../../main'
import defineReactive from '../../../data/object/defineReactive'
import defineDeepWatch from '../../../data/object/defineDeepWatch'

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
}, 'defineWatch')

// runText(function({ checkSame, showError }) {
//   const name = 'name'
//   const newName = 'newName'
//   let data = {
//     user: {
//       id: 1,
//       name: name,
//       parent: {
//         id: 'p0',
//         name: 0,
//         user: {
//           name: 'pn1'
//         }
//       }
//     }
//   }
//   defineDeepWatch(data, 'user', {
//     deep: true,
//     set: function(val, oldVal, prop, deepNum) {
//       console.log(val, oldVal, prop, deepNum)
//     }
//   })
//   // data.user.name = newName
//   // data.user.id = 2
//   data.user.parent.user.name = 'p2'
//   // let currentName = data.user.name
// }, 'defineDeepWatch')
