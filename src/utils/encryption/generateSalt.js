// @flow

import { crypto } from 'bitcore-lib'

const DEFAULT_SALT_BYTES_COUNT: number = 32

export function generateSalt(bytesCount: number = DEFAULT_SALT_BYTES_COUNT): string {
  return crypto.Random.getRandomBuffer(bytesCount).toString('base64')
}
