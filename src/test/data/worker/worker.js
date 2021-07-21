import runText from '../../main';
import setWorker from '../../../data/worker/setWorker';

runText(function({ showError }) {
  setWorker({
    func: function(list) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ a: 1 })
        }, 2000)
      })
    },
    args: [[1, 23]],
    isSync: true,
    log: true
  }).then(
    res => {
      if (res.a != 1) {
        showError('worker数据错误')
      }
     },
    err => { console.log(err) }
  )
});
