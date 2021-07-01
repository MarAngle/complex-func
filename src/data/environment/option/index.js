let option = {
  env: {
    data: process.env.NODE_ENV,
    real: process.env.NODE_ENV
  },
  mode: {
    data: '',
    real: ''
  },
  canUse: {
    Worker: false,
    Proxy: false,
    Symbol: false,
    MutationObserver: false
  }
}

export default option
