let check = {
  data: {
    mobile: {
      method: 'reg',
      data: /^((\+?86)|(\(\+86\)))?1\d{10}$/
    },
    letter: {
      method: 'reg',
      data: /^[a-zA-Z]+$/
    },
    letterandnum: {
      method: 'reg',
      data: /^[0-9a-zA-Z]*$/
    }
  }
}

check.checkData = function (type, data, size) {
  let fg = true
  if (type == 'total') {
    //
  } else {
    if (this.data[type]) {
      let method = this.data[type].method
      if (method == 'reg') {
        fg = this.data[type].data.test(data)
      }
    } else {
      fg = false
      console.error('check type is not define')
    }
  }
  if (fg && size) {
    let datasize = data.length
    if (datasize >= size.min && datasize <= size.max) {
      fg = true
    } else {
      fg = false
    }
  }
  return fg
}


export default check
