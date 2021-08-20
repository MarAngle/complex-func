import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'

runText(function({ checkSame, showError }) {
  // console.log(getOffsetTime(1225.251 * 60, 'sec', {
  //   start: 'hour',
  //   end: 'date'
  // }))
  console.log(getOffsetTime(1.33333, 'date', {
    start: 'sec',
    end: 'hour'
  }))
}, 'time');
