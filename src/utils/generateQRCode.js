import EthereumQRPlugin from 'ethereum-qr-code'

import config from 'config'

const qr = new EthereumQRPlugin()

export default function generateQRCode({ requisites, appearance, selector = '#qr-code' }) {
  const options = { ...config.qrCodeDefaultAppearance, ...appearance, selector }

  return qr.toCanvas(requisites, options)
}
