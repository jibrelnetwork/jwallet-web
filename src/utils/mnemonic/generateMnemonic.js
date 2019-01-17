// @flow

import Mnemonic from 'bitcore-mnemonic'
import { crypto } from 'bitcore-lib'

import config from 'config'

const ENGLISH_WORDS: string[] = Mnemonic.Words.ENGLISH

function concatEntropyBuffers(entropyBuffer: Buffer, randomBuffer: Buffer): Buffer {
  const totalEntropy: Buffer = Buffer.concat([entropyBuffer, randomBuffer])

  if (totalEntropy.length !== (entropyBuffer.length + randomBuffer.length)) {
    throw new Error('Concatenation of entropy buffers failed')
  }

  return crypto.Hash.sha256(totalEntropy)
}

function getHashedEntropy(entropy: ?string, randomBufferLength: number): ?Buffer {
  if (!entropy) {
    return null
  } else if (typeof entropy !== 'string') {
    throw new TypeError('Entropy is set but not a string')
  }

  const entropyBuffer: Buffer = Buffer.from(entropy)
  const randomBuffer: Buffer = crypto.Random.getRandomBuffer(randomBufferLength)

  return concatEntropyBuffers(entropyBuffer, randomBuffer).slice(0, 16)
}

function generateMnemonic(
  entropy?: string,
  randomBufferLength?: number = config.defaultRandomBufferLength,
): string {
  const hashedEntropy: ?Buffer = getHashedEntropy(entropy, randomBufferLength)

  const mnemonic = hashedEntropy
    ? new Mnemonic(hashedEntropy, ENGLISH_WORDS)
    : new Mnemonic(ENGLISH_WORDS)

  return mnemonic.toString()
}

export default generateMnemonic
