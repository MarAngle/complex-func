import formatNum from './../../../data/number/formatNum'
import getNum from './../../../data/number/getNum'
import getRandomNum from './../../../data/number/getRandomNum'

(function() {
  // console.log(formatNum(' 111 '))
  // console.log(formatNum(undefined))
  // console.log(formatNum(null))
  // console.log(formatNum(Symbol('1')))
  // console.log(formatNum({
  //   name: 1
  // }))
  // console.log(formatNum({
  //   name: 1,
  //   toString() {
  //     return '111'
  //   }
  // }))
  const maxNumber = 9007199254740992
  console.log(maxNumber + maxNumber)
  console.log(9007199254740990.99)
  console.log(getNum(9007199254740991.9 - 100.9))
})();
