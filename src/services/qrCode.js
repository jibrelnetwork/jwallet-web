// @flow

import QRCode from 'qrcode'

import config from 'config'

function generate(payload: { requisites: any, appearance: any, selector: string }): void {
  const { requisites, appearance, selector } = payload
  const options = { ...config.qrCodeDefaultAppearance, ...appearance }

  const wrapper = document.querySelector(selector)
  if (wrapper) {
    wrapper.innerHTML = ''
    const canvas = document.createElement('canvas')
    wrapper.appendChild(canvas)

    QRCode.toCanvas(canvas, `ethereum:${requisites.to}?token=ETH`, options)
  }
}

export default { generate }
