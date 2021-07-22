
import runText from '../../main'
import defineReactive from '../../../data/object/defineReactive'
import defineWatch from '../../../data/object/defineWatch'
// import defineDeepWatch from '../../../data/object/defineDeepWatch'

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
  const name = 'name'
  const newName = 'newName'
  let data = {
    user: {
      id: 1,
      name: name,
      parent: {
        id: 'p0',
        name: 0,
        user: {
          name: 'pn1'
        }
      }
    }
  }
  defineWatch(data, 'user', {
    deep: true,
    handler: function() {
      console.log(...arguments)
    }
  })
  // data.user.name = newName
  // data.user.id = 2
  data.user.parent.user.name = 'p2'
  // data.user = {
  //   id: 1
  // }
  // console.log(data.user)
  // let currentName = data.user.name
}, 'defineReactive')

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
//   defineReactive(data, 'user', {
//     deep: true,
//     set: function(val, oldVal, prop, deepNum) {
//       console.log(...arguments)
//     }
//   })
//   // data.user.name = newName
//   // data.user.id = 2
//   data.user.parent.user.name = 'p2'
//   data.user = {
//     id: 1
//   }
//   console.log(data.user)
//   // let currentName = data.user.name
// }, 'defineReactive')
