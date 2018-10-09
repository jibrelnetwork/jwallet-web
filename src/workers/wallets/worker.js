// @flow

import utils from 'jwallet-web-keystore'

import keystore from 'services/keystore'

import {
  CREATE_REQUEST,
  CHECK_NAME_REQUEST,
  createError,
  createSuccess,
  checkNameError,
  checkNameSuccess,
} from 'routes/Wallets/routes/Create/modules/walletsCreate'

import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'

export type WalletsWorkerMessage = {|
  +data: WalletsCreateAction,
|}

// eslint-disable-next-line fp/no-mutation
onmessage = (msg: WalletsWorkerMessage): void => {
  const action: WalletsCreateAction = msg.data

  switch (action.type) {
    case CHECK_NAME_REQUEST: {
      try {
        const { wallets, name } = action.payload

        keystore.checkWalletUniqueness(wallets, name, 'name')

        postMessage(checkNameSuccess())
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        postMessage(checkNameError(err.message))
      }

      break
    }

    case CREATE_REQUEST: {
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

        postMessage(createSuccess({
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

        postMessage(createError(err.message))
      }

      break
    }

    default:
      break
  }
}
