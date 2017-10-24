/*
import keystoreMethods from './keystoreWorker'

const keystoreWorker = new Worker('./keystoreWorker.js')

keystoreWorker.onmessage = function callKeystoreMethod(e) {
  const { method, result } = e.data
}

const keystoreWrapper = {}

keystoreMethods.forEach((method) => {
  const id = Date.now()

  keystoreWrapper[method] = function(...args) {
    keystoreWorker.postMessage({ method, args, id })
  }
})
*/
