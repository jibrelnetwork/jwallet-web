// @flow

import QRCode from 'qrcode'

import config from 'config'

function generate(payload: { requisites: any, appearance: any, selector: string }): void {
  const { requisites, appearance, selector } = payload
  const options = { ...config.qrCodeDefaultAppearance, ...appearance }

  const canvas = document.querySelector(selector)
  if (!canvas) {
    throw new Error('Selector is incorrect')
  }

  QRCode.toCanvas(canvas, `ethereum:${requisites.to}?token=ETH`, options)
}

export default { generate }
