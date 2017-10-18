import Keystore from 'blockchain-wallet-keystore'

const keystore = new Keystore({ scryptParams: { N: 2 ** 14, r: 8, p: 1 } })

function onmessage(e) {
  const { method, args } = e.data

  return postMessage(keystore[method](...args))
}

export default Object.keys(keystore)
