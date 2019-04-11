// @flow

import Mnemonic from 'bitcore-mnemonic'

const ENGLISH_WORDS: string[] = Mnemonic.Words.ENGLISH

function checkMnemonicValid(mnemonic: string): boolean {
  try {
    return Mnemonic.isValid(mnemonic, ENGLISH_WORDS)
  } catch (err) {
    return false
  }
}

export default checkMnemonicValid
