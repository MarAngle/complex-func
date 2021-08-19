
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
  time: {
    dict: {
      year: {
        func: 'getFullYear',
        name: 'YYYY',
        min: 2,
        offset: 0
      },
      month: {
        func: 'getMonth',
        name: 'MM',
        offset: 0
      },
      date: {
        func: 'getDate',
        name: 'DD',
        offset: 0
      },
      hour: {
        func: 'getHours',
        name: 'HH',
        offset: 0
      },
      min: {
        func: 'getMinutes',
        name: 'mm',
        offset: 0
      },
      sec: {
        func: 'getSeconds',
        name: 'ss',
        offset: 0
      }
    }
  }
}

export default config
