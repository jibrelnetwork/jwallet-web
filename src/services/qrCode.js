// @flow

import EthereumQRPlugin from 'ethereum-qr-code'

import config from 'config'

const qr = new EthereumQRPlugin()

function generate(payload: { requisites: any, appearance: any, selector: string }) {
  const { requisites, appearance, selector } = payload
  const options = { ...config.qrCodeDefaultAppearance, ...appearance, selector }

  return qr.toCanvas(requisites, options)
}

export default { generate }
