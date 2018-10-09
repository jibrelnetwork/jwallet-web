// @flow

import utils from 'jwallet-web-keystore'

import keystore from 'services/keystore'

import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'

import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'
import type { WalletsImportAction } from 'routes/Wallets/routes/Import/modules/walletsImport'

type WalletsAction = WalletsCreateAction | WalletsImportAction

export type WalletsWorkerMessage = {|
  +data: WalletsAction,
|}

// eslint-disable-next-line fp/no-mutation
onmessage = (msg: WalletsWorkerMessage): void => {
  const action: WalletsAction = msg.data

  switch (action.type) {
    case walletsCreate.CHECK_NAME_REQUEST: {
      try {
        const { wallets, name } = action.payload

        keystore.checkWalletUniqueness(wallets, name, 'name')

        postMessage(walletsCreate.checkNameSuccess())
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        postMessage(walletsCreate.checkNameError(err.message))
      }

      break
    }

    case walletsImport.CHECK_WALLET_TYPE_REQUEST: {
      const { data } = action.payload

      if (utils.checkMnemonicValid(data)) {
        postMessage(walletsImport.checkWalletTypeSuccess('mnemonic'))
      } else if (utils.checkBip32XPublicKeyValid(data)) {
        postMessage(walletsImport.checkWalletTypeSuccess('bip32Xpub'))
      } else if (utils.checkPrivateKeyValid(data)) {
        postMessage(walletsImport.checkWalletTypeSuccess('privateKey'))
      } else if (utils.checkAddressValid(data)) {
        postMessage(walletsImport.checkWalletTypeSuccess('address'))
      } else {
        postMessage(walletsImport.checkWalletTypeError('Please input valid wallet data'))
      }

      break
    }

    case walletsImport.CHECK_DERIVATION_PATH_REQUEST: {
      const { derivationPath } = action.payload
      const isValid: boolean = utils.checkDerivationPathValid(derivationPath)

      if (isValid) {
        postMessage(walletsImport.checkDerivationPathSuccess())
      } else {
        postMessage(walletsImport.checkDerivationPathError('Derivation path is not valid'))
      }

      break
    }

    case walletsCreate.CREATE_REQUEST: {
      try {
        const {
          wallets,
          passwordOptions,
          mnemonicOptions,
          testPasswordData,
          name,
          password,
          passwordHint,
        } = action.payload

        // eslint-disable-next-line fp/no-mutation, no-restricted-globals
        self.window = self

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        postMessage(walletsCreate.createSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(wallets, {
            data: utils.generateMnemonic(),
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        postMessage(walletsCreate.createError(err.message))
      }

      break
    }

    case walletsImport.IMPORT_REQUEST: {
      try {
        const {
          wallets,
          passwordOptions,
          mnemonicOptions,
          testPasswordData,
          data,
          name,
          password,
          passwordHint,
        } = action.payload

        // eslint-disable-next-line fp/no-mutation, no-restricted-globals
        self.window = self

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        postMessage(walletsImport.importSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(wallets, {
            data,
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        postMessage(walletsImport.importError(err.message))
      }

      break
    }

    default:
      break
  }
}
