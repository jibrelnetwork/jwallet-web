// @flow

import QRCode from 'qrcode'

import config from 'config'

function generate(payload: { requisites: any, appearance: any, selector: string }): void {
  const {
    selector,
    requisites,
    appearance,
  } = payload

  const options = {
    ...config.qrCodeDefaultAppearance,
    ...appearance,
  }

  const canvas = document.querySelector(selector)

  if (!canvas) {
    throw new Error('Invalid Selector Error')
  }

  QRCode.toCanvas(canvas, `ethereum:${requisites.to}?token=ETH`, options)
}

export default { generate }
