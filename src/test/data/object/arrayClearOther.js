
import runText from '../../main'
import arrayClearOther from '../../../data/object/arrayClearOther'

runText(function(isSame) {
  let list = [0, 1, 2, 3, 4, 5, 6]
  arrayClearOther(list, 3, 0)
  if (!isSame(list, [3])) {
   throw new Error('arrayClearOther错误')
  }
  let list2 = [0, 1, 2, 3, 4, 5, 6]
  arrayClearOther(list2, 3, 1)
  if (!isSame(list2, [0, 3])) {
   throw new Error('arrayClearOther错误')
  }
}, 'arrayClearOther错误')
