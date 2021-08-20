import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'

runText(function({ checkSame, showError }) {
  console.log(getOffsetTime(1225.251, 'min', {
    start: 'sec',
    end: 'date'
  }))
  console.log(getOffsetTime(12.251, 'date', {
    start: 'sec',
    end: 'date'
  }))
}, 'time');
