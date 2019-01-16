// @flow

import config from 'config'

const DEFAULT_NETWORK: string = 'livenet'

function getMnemonicOptions(options: ?MnemonicOptionsUser): MnemonicOptions {
  return !options ? {
    passphrase: '',
    network: DEFAULT_NETWORK,
    derivationPath: config.defaultDerivationPath,
  } : {
    passphrase: options.passphrase || '',
    network: options.network || DEFAULT_NETWORK,
    derivationPath: options.derivationPath || config.defaultDerivationPath,
  }
}

export default getMnemonicOptions
