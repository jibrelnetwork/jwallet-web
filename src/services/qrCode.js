// @flow

import { i18n } from 'i18n/lingui'

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
    throw new Error(i18n._(
      'notforuser.qrCode.errors.selector',
      null,
      { defaults: 'Invalid Selector Error' },
    ))
  }

  QRCode.toCanvas(canvas, `ethereum:${requisites.to}?token=ETH`, options)
}

export default { generate }
