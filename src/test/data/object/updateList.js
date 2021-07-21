import runText from '../../main';
import updateList from './../../../data/object/updateList'

runText(function() {
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
        throw new Error('updateList中update判断未成功')
      }
    },
    format: function(targetItem) {
      if (targetItem.id != '3') {
        throw new Error('updateList中format判断未成功')
      }
      return targetItem
    },
    destroy: function(targetItem) {
      if (targetItem.id != '2') {
        throw new Error('updateList中destroy判断未成功')
      }
    }
  })
  if (list.length != 2 || list[0].name != 'a1' || list[1].id != '3') {
    throw new Error('updateList未成功')
  }
}, 'updateList错误');
