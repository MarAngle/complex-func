import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'

runText(function({ checkSame, showError }) {
  checkSame(getOffsetTime((1200 + 30) * 60, 'sec', {
    start: 'hour',
    end: 'date'
  }), { hour: 20.5, date: 0 }, '由秒转换到时-日错误')
  checkSame(getOffsetTime(1.33333, 'date', {
    start: 'sec',
    end: 'hour'
  }), { min: 59, sec: 59.7119999999856, hour: 31 }, '由日转换到秒-时错误')
  checkSame(getOffsetTime(150.5, 'min', {
    start: 'min',
    end: 'hour'
  }), { min: 30.5, hour: 2 }, '由分钟转换到分钟-时错误')
  checkSame(getOffsetTime(150.5, 'min', {
    start: 'sec',
    end: 'hour'
  }), { min: 30, sec: 30, hour: 2 }, '由分钟转换到分钟-时错误')
}, 'time');
