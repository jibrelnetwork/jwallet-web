// @flow strict

import Mnemonic from 'bitcore-mnemonic'
import { crypto } from 'bitcore-lib'
import { t } from 'ttag'

const RANDOM_BUFFER_LENGTH: number = 32
const ENGLISH_WORDS: string[] = Mnemonic.Words.ENGLISH

function concatEntropyBuffers(entropyBuffer: Buffer, randomBuffer: Buffer): Buffer {
  const totalEntropy: Buffer = Buffer.concat([entropyBuffer, randomBuffer])

  if (totalEntropy.length !== (entropyBuffer.length + randomBuffer.length)) {
    throw new Error(t`Concatenation of entropy buffers failed`)
  }

  return crypto.Hash.sha256(totalEntropy)
}

function getHashedEntropy(entropy: ?string, randomBufferLength: number): ?Buffer {
  if (!entropy) {
    return null
  } else if (typeof entropy !== 'string') {
    throw new TypeError(t`Entropy is set but not a string`)
  }

  const entropyBuffer: Buffer = Buffer.from(entropy)
  const randomBuffer: Buffer = crypto.Random.getRandomBuffer(randomBufferLength)

  return concatEntropyBuffers(entropyBuffer, randomBuffer).slice(0, 16)
}

export function generateMnemonic(entropy?: string): string {
  const hashedEntropy: ?Buffer = getHashedEntropy(entropy, RANDOM_BUFFER_LENGTH)

  const mnemonic = hashedEntropy
    ? new Mnemonic(hashedEntropy, ENGLISH_WORDS)
    : new Mnemonic(ENGLISH_WORDS)

  return mnemonic.toString()
}
