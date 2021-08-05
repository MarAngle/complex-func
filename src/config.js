
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
  }
}

export default config
