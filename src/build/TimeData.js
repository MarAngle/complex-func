const baseFormat = 'YYYY/MM/DD HH:mm:ss'
const targetFormat = 'YYYY/MM/DD HH:mm:ss'

let timeOption = {
  data: {
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

class TimeData {
  constructor (data, format) {
    this.option = {
      format: ''
    }
    this.time = {}
    this.data = {
      year: '',
      month: '',
      date: '',
      hour: '',
      min: '',
      sec: '',
      week: ''
    }
    this.build(data, format)
  }
  build(data, format) {
    if (!format) {
      format = baseFormat
    }
    let date
    if (format === 'X') {
      date = new Date(data * 1000)
    } else if (format === 'x') {
      date = new Date(data)
    }
    date = this.buildByFormat(data, format)
    // if (!format) {
    //   let time = new Date(data)
    //   for (let n in timeOption.data) {
    //     let timeItem = timeOption.data[n]
    //     this.time[n] = time[timeItem.func]() + timeItem.offset
    //   }
    // } else {

    // }
  }
  buildByFormat(data, format) {
    let currentDate = new Date()
    for (let n in timeOption.data) {
      let optionItem = timeOption.data[n]
      let index = format.indexOf(optionItem.name)
      if (index > -1) {
      }
    }
  }
  format() {

  }
}
export default TimeData
