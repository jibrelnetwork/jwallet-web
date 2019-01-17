// @flow

import Mnemonic from 'bitcore-mnemonic'

const ENGLISH_WORDS: string[] = Mnemonic.Words.ENGLISH

function checkMnemonicValid(mnemonic: string): boolean {
  return Mnemonic.isValid(mnemonic, ENGLISH_WORDS)
}

export default checkMnemonicValid
