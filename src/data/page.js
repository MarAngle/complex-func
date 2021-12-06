import throttle from './utils/throttle'

let page = {
  recount: {
    data: 0,
    body: 0
  },
  data: {
    body: {
      width: 0,
      height: 0
    },
    main: {
      width: 0,
      height: 0
    },
    extra: {
      width: 0,
      height: 0
    }
  },
  mod: {},
  // 添加模块
  installMod(name, pageMod) {
    this.recount[name] = 0
    if (pageMod) {
      this.mod[name] = pageMod
    }
  },
  // 重计算
  recountChange(name) {
    this.recount[name]++
    this.recount.main++
  },
  // 触发模块变更
  triggerChange(name, ...args) {
    let pageMod = this.mod[name]
    if (pageMod && pageMod.change) {
      pageMod.change(...args)
      this.triggerRecount()
    } else {
      this.recountMain()
    }
    this.recountChange(name)
  },
  // 触发重计算
  triggerRecount() {
    this.recountExtra()
    this.recountMain()
  },
  // 重计算额外占用部分
  recountExtra() {
    this.data.extra.width = 0
    this.data.extra.height = 0
    for (const name in this.mod) {
      let pageMod = this.mod[name]
      if (pageMod && pageMod.recount) {
        pageMod.recount(this.data.extra)
      }
    }
  },
  // 重计算可用部分
  recountMain() {
    this.data.main.width = this.data.body.width - this.data.extra.width
    this.data.main.height = this.data.body.height - this.data.extra.height
  },
  // 设置body数据
  recountBody() {
    this.data.body.width = document.documentElement.clientWidth
    this.data.body.height = document.documentElement.clientHeight
    this.recountMain()
    this.recountChange('body')
  },
  // 加载body
  initBody(offset = 200) {
    this.recountBody()
    window.onresize = throttle(() => {
      this.recountBody()
    }, offset, 2)
  }
}

export default page
