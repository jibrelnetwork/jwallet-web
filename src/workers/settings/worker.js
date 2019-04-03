// @flow

import nacl from 'tweetnacl'
import { t } from 'ttag'

import config from 'config'
import reEncryptWallet from 'utils/wallets/reEncryptWallet'

import {
  decryptInternalKey,
  encryptInternalKey,
  getPasswordOptions,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  validationPasswordForm,
  changePaymentPasswordPending,
  type SettingsAction,
} from 'store/modules/settings'

import * as wallets from 'store/modules/wallets'

type SettingsWorkerMessage = {|
  +data: SettingsAction,
|}

export type SettingsWorkerInstance = {|
  onmessage: (SettingsWorkerMessage) => void,
  +postMessage: (SettingsAction) => void,
  window: SettingsWorkerInstance,
|}

/* eslint-disable-next-line no-restricted-globals */
const settingsWorker: SettingsWorkerInstance = self

// eslint-disable-next-line fp/no-mutation
settingsWorker.window = settingsWorker

settingsWorker.onmessage = (msg: SettingsWorkerMessage): void => {
  try {
    const {
      state,
      passwordForm,
    } = msg.data

    const {
      items,
      internalKey,
      passwordOptions,
    } = state.wallets.persist

    const {
      salt,
      scryptParams,
      encryptionType,
      derivedKeyLength,
    }: PasswordOptions = passwordOptions

    const dk: Uint8Array =
      deriveKeyFromPassword(passwordForm.passwordOld, scryptParams, derivedKeyLength, salt)

    const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)
    const internalKeyNew: Uint8Array = nacl.randomBytes(config.defaultSaltBytesCount)
    const passwordOptionsNew = getPasswordOptions(passwordForm.passwordHint)

    const dkNew: Uint8Array = deriveKeyFromPassword(
      passwordForm.passwordNew,
      passwordOptionsNew.scryptParams,
      passwordOptionsNew.derivedKeyLength,
      passwordOptionsNew.salt,
    )

    settingsWorker.postMessage(wallets.setWallets({
      items: items.map(wallet => reEncryptWallet(
        wallet,
        internalKeyDec,
        encryptionType,
        internalKeyNew,
        passwordOptionsNew.encryptionType,
      )),
      passwordOptions: passwordOptionsNew,
      internalKey: encryptInternalKey(internalKeyNew, dkNew, passwordOptionsNew.encryptionType),
    }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)

    settingsWorker.postMessage(validationPasswordForm({
      passwordOld: t`Password is invalid`,
    }))
  } finally {
    settingsWorker.postMessage(changePaymentPasswordPending(false))
  }
}
