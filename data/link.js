import router from '@/router'

let link = {

}

link.toLink = function (target, method = 'router') {
  if (method == 'router') {
    router.push(target)
  }
}

export default link
