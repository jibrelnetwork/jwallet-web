// @flow

import utils from 'jwallet-web-keystore'

import keystore from 'services/keystore'

import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsRename from 'routes/Wallets/routes/Rename/modules/walletsRename'
import * as walletsDelete from 'routes/Wallets/routes/Delete/modules/walletsDelete'

import type { WalletsAction } from 'routes/Wallets/modules/wallets'
import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'
import type { WalletsImportAction } from 'routes/Wallets/routes/Import/modules/walletsImport'
import type { WalletsRenameAction } from 'routes/Wallets/routes/Rename/modules/walletsRename'
import type { WalletsDeleteAction } from 'routes/Wallets/routes/Delete/modules/walletsDelete'

export type WalletsAnyAction =
  WalletsAction |
  WalletsCreateAction |
  WalletsImportAction |
  WalletsRenameAction |
  WalletsDeleteAction

type WalletsWorkerMessage = {|
  +data: WalletsAnyAction,
|}

export type WalletsWorkerInstance = {|
  onmessage: (WalletsWorkerMessage) => void,
  +postMessage: (WalletsAnyAction) => void,
|}

/* eslint-disable-next-line no-restricted-globals */
const walletsWorker: WalletsWorkerInstance = self

walletsWorker.onmessage = (msg: WalletsWorkerMessage): void => {
  const action: WalletsAnyAction = msg.data

  switch (action.type) {
    case wallets.CHECK_NAME_REQUEST: {
      try {
        const { items, name, newWalletLocation } = action.payload

        keystore.checkWalletUniqueness(items, name, 'name')

        walletsWorker.postMessage(wallets.checkNameSuccess(newWalletLocation))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.checkNameError(err.message))
      }

      break
    }

    case walletsImport.CHECK_WALLET_TYPE_REQUEST: {
      const { data } = action.payload

      if (utils.checkMnemonicValid(data)) {
        walletsWorker.postMessage(walletsImport.checkWalletTypeSuccess('mnemonic'))
      } else if (utils.checkBip32XPublicKeyValid(data)) {
        walletsWorker.postMessage(walletsImport.checkWalletTypeSuccess('bip32Xpub'))
      } else if (utils.checkPrivateKeyValid(data)) {
        walletsWorker.postMessage(walletsImport.checkWalletTypeSuccess('privateKey'))
      } else if (utils.checkAddressValid(data)) {
        walletsWorker.postMessage(walletsImport.checkWalletTypeSuccess('address'))
      } else {
        walletsWorker.postMessage(
          walletsImport.checkWalletTypeError('Please input valid wallet data'),
        )
      }

      break
    }

    case walletsImport.CHECK_DERIVATION_PATH_REQUEST: {
      const { derivationPath } = action.payload
      const isValid: boolean = utils.checkDerivationPathValid(derivationPath)

      if (isValid) {
        walletsWorker.postMessage(walletsImport.checkDerivationPathSuccess())
      } else {
        walletsWorker.postMessage(
          walletsImport.checkDerivationPathError('Derivation path is not valid'),
        )
      }

      break
    }

    case walletsCreate.CREATE_REQUEST: {
      try {
        const {
          items,
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

        walletsWorker.postMessage(walletsCreate.createSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(items, {
            data: utils.generateMnemonic(),
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsCreate.createError(err.message))
      }

      break
    }

    case walletsImport.IMPORT_REQUEST: {
      try {
        const {
          items,
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

        walletsWorker.postMessage(walletsImport.importSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(items, {
            data,
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsImport.importError(err.message))
      }

      break
    }

    case walletsRename.RENAME_REQUEST: {
      try {
        const { items, name, walletId } = action.payload

        keystore.checkWalletUniqueness(items, name, 'name')

        const itemsNew = keystore.updateWallet(items, walletId, { name })

        walletsWorker.postMessage(walletsRename.renameSuccess(itemsNew))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsRename.renameError(err.message))
      }

      break
    }

    case walletsDelete.DELETE_REQUEST: {
      try {
        const { items, walletId } = action.payload

        const itemsNew = keystore.removeWallet(items, walletId)

        walletsWorker.postMessage(walletsDelete.deleteSuccess(itemsNew))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsDelete.deleteError(err.message))
      }

      break
    }

    default:
      break
  }
}
