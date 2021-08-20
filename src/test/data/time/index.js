import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'

runText(function({ checkSame, showError }) {
  console.log(getOffsetTime(1.251, 'date', {
    start: 'sec',
    end: 'hour'
  }))
}, 'time');
