import { util } from "tinymce"

let letterData = {
  small: [],
  big: [],
  number: []
}
for (let bi = 97; bi < 123; bi++) {
  letterData.small.push(String.fromCharCode(bi))
}
for (let si = 65; si < 91; si++) {
  letterData.big.push(String.fromCharCode(si))
}
for (let ni = 0; ni < 10; ni++) {
  letterData.number.push(ni.toString())
}

let utils = {
}
// 对象操作函数
utils.isArray = function(data) {
  if (Array.isArray) {
    return Array.isArray(data)
  } else {
    return Object.prototype.toString.call(data) === '[object Array]'
  }
}
// 对象操作函数
utils.isFile = function(data) {
  return Object.prototype.toString.call(data) === '[object File]'
}
utils.inArray = function (val, arr) {
  if (arr.indexOf(val) > -1) {
    return true
  } else {
    return false
  }
}

utils.formatList = function(originlist, option, targetlist = []) {
  for (let n in originlist) {
    let item = this.formatItem(originlist[n], option)
    targetlist.push(item)
  }
  return targetlist
}

utils.formatItem = function(originitem, option, targetitem = {}) {
  let optionData = option.data
  let optionUnadd = option.unadd
  for (let n in originitem) {
    if (optionData[n]) {
      targetitem[optionData[n]] = originitem[n]
    } else {
      if (!optionUnadd) {
        targetitem[n] = originitem[n]
      }
    }
  }
  return targetitem
}
// undefined boolean string object number function array null reg symbol
utils.getType = function (data) {
  let type = typeof (data)
  if (type === 'object') {
    if (this.isArray(data)) {
      type = 'array'
    } else if (data === null) {
      type = 'null'
    } else if (data.constructor === RegExp) {
      type = 'reg'
    } else if (this.isFile(data)) {
      type = 'file'
    }
  }
  return type
}

// 复杂数据结构 => 这里指的是赋值是更改的内存指针结构而不是内存地址
utils.isComplex = function(data) {
  let complex = ['object', 'function', 'array']
  return complex.indexOf(data) > -1
}

utils.checkComplex = function(data) {
  let type = this.getType(data)
  return this.isComplex(type)
}

utils.copyJson = function (json, spec) {
  if (!spec) {
    return JSON.parse(JSON.stringify(json))
  } else {
    console.log('deep clone, check it, moment对象考虑删除')
    let newjson
    let type = this.getType(json)
    if (type === 'object') {
      newjson = {}
      for (let i in json) {
        newjson[i] = this.copyJson(json[i], type)
      }
    } else if (type === 'array') {
      newjson = []
      for (let i in json) {
        newjson.push(this.copyJson(json[i], type))
      }
    } else if (type === 'null') {
      newjson = null
    } else {
      newjson = json
    }
    return newjson
  }
}
utils.jsonToForm = function (jsondata) {
  let formData = new FormData()
  for (let v in jsondata) {
    let type = utils.getType(jsondata[v])
    if (type == 'object') {
      formData.append(v, this.jsonToForm(jsondata[v]))
    } else {
      formData.append(v, jsondata[v])
    }
  }
  return formData
}
utils.appendProp = function(data, propname, propdata, type = 'json') {
  if (type == 'json') {
    data[propname] = propdata
  } else if (type == 'formdata') {
    data.append(propname, propdata)
  }
}
utils.showJson = function(json) {
  console.log(JSON.stringify(json))
}

// 获取对象的属性，该函数用户获取对象不确定是否存在时调用
utils.getProp = function(data, prop, nodata = false) {
  if (data && data[prop]) {
    return data[prop]
  } else {
    return nodata
  }
}

utils.getPropByList = function(data, proplist) {
  let res = data
  proplist = proplist.filter(item => item && item.trim())
  for (let n = 0; n < proplist.length; n++) {
    if (res[proplist[n]]) {
      // res = null
      res = res[proplist[n]]
    } else {
      res = null
      break
    }
  }
  return res
}

// 根据'mainprop.prop'格式字符串获取对象值
utils.getPropByStr = function(data, propstr) {
  if (!data || !propstr) {
    return false
  } else if (propstr.indexOf('.') > -1) {
    let list = propstr.split('.')
    let res = this.getPropByList(data, list)
    return res
  } else {
    return data[propstr]
  }
}
utils.setPropByList = function(data, proplist, propdata) {
  let res = data
  proplist = proplist.filter(item => item && item.trim())
  for (let n = 0; n < proplist.length; n++) {
    if (n < proplist.length - 1) {
      if (!res[proplist[n]]) {
        res[proplist[n]] = {}
      }
      res = res[proplist[n]]
    } else {
      res[proplist[n]] = propdata
    }
  }
}
utils.setPropByStr = function(data, propstr, propdata) {
  if (!data || !propstr) {
    return false
  } else if (propstr.indexOf('.') > -1) {
    let list = propstr.split('.')
    this.setPropByList(data, list, propdata)
  } else {
    data[propstr] = propdata
  }
}

// 根据type设置对象属性值
utils.setStrPropByType = function(item, prop, data, type = 'string') {
  let targetdata = this.formatDataByType(data, type)
  this.setPropByStr(item, prop, targetdata)
}
utils.formatDataByType = function(data, type = 'string') {
  let res
  if (type == 'boolean') {
    if (data) {
      res = true
    } else {
      res = false
    }
  } else if (type == 'number') {
    res = this.getNum(data, 'origin')
  } else {
    res = data
  }
  return res
}

// 根据item[prop]不存在时赋值默认值defaultdata
utils.reBuildProp = function(item, prop, defaultdata) {
  if (!this.hasProp(item, prop)) {
    item[prop] = defaultdata
  }
}
utils.hasProp = function(item, prop) {
  if (!item[prop]) {
    if (!Object.prototype.hasOwnProperty.call(item, prop)) {
      for (let n in item) {
        if (n == prop) {
          return true
        } else {
          return false
        }
      }
    } else {
      return true
    }
  } else {
    return true
  }
}
utils.buildTree = function(originList, option = {}) {
  let idprop = option.id || 'id'
  let parentidprop = option.parentid || 'parentid'
  let childrenprop = option.children || 'children'
  let temp = {}
  let mainlist = []
  for (let n in originList) {
    this.buildTreeNext(temp, originList[n], idprop, parentidprop, childrenprop)
  }
  for (let n in temp) {
    if (!temp[n].isdata) {
      mainlist = mainlist.concat(temp[n].data[childrenprop])
    }
  }
  temp = null
  return mainlist
}
/*
1.不存在父节点则说明为根节点
2.存在父节点
  1.判断自己的数据是否已经模拟，创建或者赋值
  2.判断父节点是否存在，挂载上去
*/
utils.buildTreeNext = function(temp, oitem, idprop, parentidprop, childrenprop) {
  let itemTemp = temp[oitem[idprop]]
  // 存在值则说明此时存在虚拟构建的数据
  if (itemTemp) {
    itemTemp.isdata = true
    for (let n in oitem) {
      itemTemp.data[n] = oitem[n]
    }
  } else {
    // 遍历到此时暂时未有该对象的子对象出现，因此直接实际构建数据
    oitem[childrenprop] = []
    itemTemp = {
      isdata: true,
      data: oitem
    }
    temp[oitem[idprop]] = itemTemp
  }
  let parentTemp = temp[oitem[parentidprop]]
  // 存在父节点则插入数据到父节点的列表中，此时不需要判断父节点的构建是否是虚拟构建
  if (parentTemp) {
    parentTemp.data[childrenprop].push(itemTemp.data)
  } else {
    // 不存在父节点则虚拟构建父节点并直接赋值到列表中
    parentTemp = {
      isdata: false, // 数据实际构建判断
      data: {
        [childrenprop]: [itemTemp.data]
      }
    }
    temp[oitem[parentidprop]] = parentTemp
  }
}

// 字符串函数
utils.fillStr = function (str, interval = '0', target = 2, type = 'head') {
  str = str.toString()
  interval = interval.toString()
  for (let i = 0; str.length < target; i++) {
    if (type == 'head') {
      str = interval + str
    } else if (type == 'foot') {
      str = str + interval
    } else {
      return str
    }
  }
  return str
}
utils.trimData = function(data) {
  let type = this.getType(data)
  if (type == 'string') {
    data = data.trim()
  }
  return data
}

// 数字操作
utils.getNum = function (original, type = 'round', radix = 2) { // 格式化数字
  let num = parseFloat(original)
  if (isNaN(num)) {
    num = 0
    console.log('NAN is find')
  } else if (type != 'origin' && Math.round(num) !== num) { // 如果是小数
    let rate = Math.pow(10, radix)
    num = Math[type](num * rate) / rate
  }
  return num
}


// 获取从start开始, 最大值为size - 1 的随机数,开始和结束的可能平均
utils.getRandomNum = function (start = 0, size = 10) {
  return start + Math.floor(Math.random() * size)
}

utils.getRandomData = function({ size, letter }) {
  let data = ''
  for (let n = 0; n < size; n++) {
    data = data + this.getRandomLetter(letter)
  }
  return data
}

utils.getRandomInList = function(list) {
  let size = list.length
  let index = this.getRandomNum(0, size)
  return list[index]
}

utils.getRandomLetter = function(letter) {
  let list = []
  if (!letter) {
    letter = {
      small: true,
      big: true,
      number: true
    }
  }
  if (letter.small) {
    list = list.concat(letterData.small)
  }
  if (letter.big) {
    list = list.concat(letterData.big)
  }
  if (letter.number) {
    list = list.concat(letterData.number)
  }
  return this.getRandomInList(list)
}
// 日期操作函数
const timeFunc = [
  {
    prop: 'year',
    func: 'getFullYear',
    offset: 0,
    maxsize: 4
  },
  {
    prop: 'month',
    func: 'getMonth',
    offset: 1,
    maxsize: 2
  },
  {
    prop: 'day',
    func: 'getDate',
    offset: 0,
    maxsize: 2
  },
  {
    prop: 'hour',
    func: 'getHours',
    offset: 0,
    maxsize: 2
  },
  {
    prop: 'min',
    func: 'getMinutes',
    offset: 0,
    maxsize: 2
  },
  {
    prop: 'sec',
    func: 'getSeconds',
    offset: 0,
    maxsize: 2
  }
]

utils.buildTimeData = function () {
  return {
    date: null,
    origin: {}, // 数字数据
    str: {} // 字符串数据
  }
}
utils.getTimeData = function (act, time) {
  let TimeData = this.buildTimeData()
  if (act == 'time') {
    TimeData.date = new Date(time)
  } else if (act == 'date') {
    TimeData.date = time
  }
  this.formatTimeData(TimeData)
  return TimeData
}
utils.formatTimeData = function (TimeData) {
  TimeData.origin.time = TimeData.date.getTime()
  TimeData.str.time = TimeData.origin.time.toString()
  for (let n in timeFunc) {
    let titem = timeFunc[n]
    TimeData.origin[titem.prop] = TimeData.date[titem.func]() + titem.offset
    TimeData.str[titem.prop] = this.fillStr(TimeData.origin[titem.prop], '0', titem.maxsize)
  }
}
utils.timeToStr = function (time, start = 0, end = 5, spitlist, nofill) {
  if (!spitlist) {
    spitlist = ['-', '-', ' ', ':', ':', '']
  }
  let res = ''
  let dateObj = new Date(time)
  for (let i = start; i <= end; i++) {
    if (!nofill) {
      res += this.fillStr(dateObj[timeFunc[i].func]() + timeFunc[i].offset)
    } else {
      res += (dateObj[timeFunc[i].func]() + timeFunc[i].offset).toString()
    }
    if (spitlist[i]) {
      res += spitlist[i]
    }
  }
  return res
}
utils.formatDate = function (targetdate, formatdata) {
  if (!formatdata) {
    formatdata = {
      year: targetdate.getFullYear()
    }
  }
  let d = {}
  for (let n in timeFunc) {
    let titem = timeFunc[n]
    d[titem.prop] = formatdata[titem.prop] !== undefined ? formatdata[titem.prop] : targetdate[titem.func]()
  }
  return new Date(d.year, d.month, d.day, d.hour, d.min, d.sec)
}

// token 函数




// 本地缓存函数
const localtemp = {
  pre: 'WUZHENG'
}
utils.setLocalTemp = function(prop, data, time) {
  prop = `${localtemp.pre}-${prop}`
  localStorage.setItem(prop, data)
  if (time) {
    let timeprop = prop + '_time'
    localStorage.setItem(timeprop, new Date().getTime())
  }
}
utils.getLocalTemp = function(prop, time, refresh) {
  prop = `${localtemp.pre}-${prop}`
  let data = localStorage.getItem(prop)
  if (data && time) {
    let timeprop = prop + '_time'
    let currenttime = new Date().getTime()
    let localtime = localStorage.getItem(timeprop)
    time = time * 60
    if ((currenttime - localtime) > time) {
      data = false
    } else if (refresh) {
      localStorage.setItem(timeprop, currenttime)
    }
  }
  return data
}
utils.removeLocalTemp = function(prop, time) {
  prop = `${localtemp.pre}-${prop}`
  localStorage.removeItem(prop)
  if (time) {
    let timeprop = prop + '_time'
    localStorage.removeItem(timeprop)
  }
}

// 功能函数
utils.formatQueryUrl = function (url, data) {
  let type = 'init'
  if (url.indexOf('?') > -1) {
    type = 'extra'
  }
  if (type == 'init') {
    url += '?'
  } else if (type == 'extra') {
    url += '&'
  }
  for (let n in data) {
    url = url + n + '=' + data[n]
    url += '&'
  }
  return url.substring(0, url.length - 1)
}

// 公用函数
// 更改list列表中选择的prop属性为指定值target,存在item则item更改为itemtarget
utils.choiceProp = function (list, prop, target, item, itemtarget) {
  for (let n in list) {
    list[n][prop] = false
  }
  if (item) {
    item[prop] = true
  }
}

utils.downloadFile = function (data) {
  if (data) {
    let type = this.getType(data)
    if (type == 'string') {
      data = {
        url: data
      }
    }
    if (!data.name) {
      data.name = '文件'
    }
    let downloadButton = document.createElement('a')
    downloadButton.setAttribute('download', data.name)
    downloadButton.href = data.url
    downloadButton.click()
    downloadButton = null
    return true
  } else {
    return false
  }
}

export default utils
