import updateList from './../../../data/object/updateList'

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
