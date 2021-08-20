import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'

runText(function({ checkSame, showError }) {
  console.log(getOffsetTime(60 * 60 * 12))
}, 'time');
