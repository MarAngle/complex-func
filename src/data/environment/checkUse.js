import checkUseItem from './checkUseItem'

/**
 * 检查可用
 */
function checkUse() {
  const showError = false
  checkUseItem('Worker', 'Worker', showError)
  checkUseItem('Proxy', 'Proxy', showError)
  checkUseItem('Symbol', 'Symbol', showError)
  checkUseItem('MutationObserver', 'MutationObserver', showError)
}

export default checkUse
