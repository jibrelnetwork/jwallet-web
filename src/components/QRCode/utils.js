// @flow

import {
  clipboard,
  fileSaver,
} from 'services'

export function saveQRCode(): void {
  const canvas = document.querySelector('#qrcode canvas')

  if (!canvas) {
    return
  }

  fileSaver.saveCanvas(canvas, 'jwallet-qrcode')
}

export function copyQRCode(): void {
  const canvas = document.querySelector('#qrcode canvas')

  if (!canvas) {
    return
  }

  clipboard.copyCanvas(canvas)
}

