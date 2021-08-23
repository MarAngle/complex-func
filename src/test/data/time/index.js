import runText from '../../main';
import getOffsetTime from './../../../data/time/getOffsetTime'
import getOffsetTimeStr from './../../../data/time/getOffsetTimeStr'

runText(function({ checkSame, showError }) {

  checkSame(getOffsetTime((1200 + 30) * 60, 'sec', {
    start: 'hour',
    end: 'date'
  }), { hour: 20.5, date: 0 }, '由[秒]转换到[时-日]错误')

  checkSame(getOffsetTime(1.33333, 'date', {
    start: 'sec',
    end: 'hour'
  }), { min: 59, sec: 59.7119999999856, hour: 31 }, '由[日]转换到[秒-时]错误')

  checkSame(getOffsetTime(150.5, 'min', {
    start: 'min',
    end: 'hour'
  }), { min: 30.5, hour: 2 }, '由[分]转换到[分-时]错误')

  checkSame(getOffsetTime(150.5, 'min', {
    start: 'sec',
    end: 'hour'
  }), { min: 30, sec: 30, hour: 2 }, '由[分]转换到[秒-时]错误')

  checkSame(getOffsetTime(107, 'sec', {
    start: 'sec',
    end: 'hour'
  }), { min: 1, sec: 47, hour: 0 }, '由[秒]转换到[秒-时]错误')

  checkSame(getOffsetTimeStr(150.5, 'min', {
    start: 'sec',
    end: 'hour'
  }), '2时30分30秒', '由[分]转换到[秒-时]str错误')

  checkSame(getOffsetTimeStr(150.5, 'min', {
    start: 'sec',
    end: 'hour',
    format: {
      fixed: true
    }
  }), '02时30分30秒', '由[分]转换到[秒-时]str fixed模式错误')

}, 'time');
