import runText from '../../main';
import formatTree from './../../../data/object/formatTree'

runText(function() {
  // formatTree相关
  const list = [
    {
      pid: 3,
      id: 6,
      name: '3-6'
    },
    {
      pid: 0,
      id: 2,
      name: '2',
      children: [
        {
          pid: 2,
          id: 100,
          name: '2-100'
        }
      ]
    },
    {
      pid: 0,
      id: 1,
      name: '1'
    },
    {
      pid: 2,
      id: 3,
      name: '2-3'
    },
    {
      pid: 1,
      id: 4,
      name: '1-4'
    },
    {
      pid: 2,
      id: 5,
      name: '2-5'
    }
  ]
  let treeList = formatTree(list, {
    parentId: 'pid'
  })
  if (treeList.length != 2 || treeList[0].name != '2' || treeList[1].name != '1') {
    throw new Error('formatTree未成功,长度或者顺序错误')
  } else {
    let insideData = treeList[0].children[1].children[0]
    if (!insideData || insideData.name != '3-6') {
      throw new Error('formatTree未成功，内部值错误')
    }
  }

  let treeList2 = formatTree(list, {
    parentId: 'pid',
    childrenFormat: function(childrenList, originItem) {
      if (childrenList) {
        childrenList = []
      }
      return childrenList
    }
  })
  let insideData = treeList2[0].children[0].children[0]
  if (!insideData || insideData.name != '3-6') {
    throw new Error('formatTree未成功，childrenFormat错误')
  }
}, 'formatTree错误');
