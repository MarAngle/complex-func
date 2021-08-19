
const config = {
  Require: {
    devShowRule: true,
    failMsg: '服务器请求失败，请刷新重试或联系管理员！'
  },
  RequireRule: {
    defaultTokenName: 'default'
  },
  TokenRule: {
    location: 'body'
  },
  local: {
    pre: 'default'
  },
  type: {
    emptyCheckList: ['object', 'array']
  },
  time: {
    format: {
      default: 'YYYY/MM/DD HH:mm:ss',
      target: 'YYYY/MM/DD HH:mm:ss'
    },
    dict: {
      list: ['year', 'month', 'date', 'hour', 'min', 'sec'],
      data: {
        year: {
          func: 'getFullYear',
          code: 'YYYY',
          default: undefined,
          offset: 0
        },
        month: {
          func: 'getMonth',
          code: 'MM',
          default: 0,
          offset: 1
        },
        date: {
          func: 'getDate',
          code: 'DD',
          default: 1,
          offset: 0
        },
        hour: {
          func: 'getHours',
          code: 'HH',
          default: 0,
          offset: 0
        },
        min: {
          func: 'getMinutes',
          code: 'mm',
          default: 0,
          offset: 0
        },
        sec: {
          func: 'getSeconds',
          code: 'ss',
          default: 0,
          offset: 0
        }
      }
    }
  }
}

export default config
