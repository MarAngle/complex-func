import getNum from './../../../data/number/getNum'
import getRandomNum from './../../../data/number/getRandomNum'

(function() {
  const maxNumber = 9007199254740992
  console.log(maxNumber + maxNumber)
  console.log(9007199254740990.99)
  console.log(getNum(9007199254740991.9 - 100.9))
})();
