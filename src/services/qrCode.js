import EthereumQRPlugin from 'ethereum-qr-code'

import config from 'config'

const qr = new EthereumQRPlugin()

function generate({ requisites, appearance, selector = '#qr-code' }) {
  const options = { ...config.qrCodeDefaultAppearance, ...appearance, selector }

  return qr.toCanvas(requisites, options)
}

export default { generate }
