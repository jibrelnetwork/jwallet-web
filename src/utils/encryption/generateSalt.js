// @flow

import { crypto } from 'bitcore-lib'

function generateSalt(byteCount: number): string {
  return crypto.Random.getRandomBuffer(byteCount).toString('base64')
}

export default generateSalt
