// @flow

import { connect } from 'react-redux'
import { t } from 'ttag'

import config from 'config'
import getWallet from 'utils/wallets/getWallet'
import { checkMnemonicType } from 'utils/wallets'
import { WalletInconsistentDataError } from 'errors'
import { selectUpgrade } from 'store/selectors/upgrade'
import { router5BackOrFallbackFunctionCreator } from 'utils/browser'

import {
  submitMnemonicRequest as onSubmitMnemonic,
  submitPrivateKeyRequest as onSubmitPrivateKey,
} from 'store/modules/upgrade'

import {
  checkPrivateKeyValid,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  checkMnemonicValid,
  getXPUBFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

// eslint-disable-next-line import/no-duplicates
import UpgradeView from './UpgradeView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './UpgradeView'

function validatePrivateKey(address: ?Address) {
  return ({ privateKey }: UpgradePrivateKeyFormFieldValues): UpgradePrivateKeyFormFieldErrors => {
    if (!address) {
      throw new WalletInconsistentDataError('Address is empty')
    }

    const privateKeyInvalidErr: string = t`Private key is invalid`

    if (!privateKey) {
      return {
        privateKey: privateKeyInvalidErr,
      }
    }

    const privateKeyLower: string = privateKey.trim().toLowerCase()
    const isPrivateKeyValid: boolean = checkPrivateKeyValid(privateKeyLower)

    if (!isPrivateKeyValid) {
      return {
        privateKey: privateKeyInvalidErr,
      }
    }

    const addressFromPrivateKey: string = getAddressFromPrivateKey(privateKeyLower)
    const isAddressEqual: boolean = address.toLowerCase() === addressFromPrivateKey.toLowerCase()

    if (!isAddressEqual) {
      return {
        privateKey: t`Entered data is not for this wallet`,
      }
    }

    return {}
  }
}

function validateMnemonic(bip32XPublicKey: ?string) {
  return ({
    mnemonic,
    passphrase,
    derivationPath,
  }: UpgradeMnemonicFormFieldValues): UpgradeMnemonicFormFieldErrors => {
    if (!bip32XPublicKey) {
      throw new WalletInconsistentDataError('bip32XPublicKey is empty')
    }

    const mnemonicInvalidErr: string = t`Mnemonic is invalid`

    if (!mnemonic) {
      return {
        mnemonic: mnemonicInvalidErr,
      }
    }

    const mnemonicLower: string = mnemonic.trim().toLowerCase()
    const isMnemonicValid: boolean = checkMnemonicValid(mnemonicLower)
    const derivPath: string = derivationPath || config.defaultDerivationPath
    const isDerivationPathValid: boolean = checkDerivationPathValid(derivPath)

    if (!(isMnemonicValid && isDerivationPathValid)) {
      return {
        mnemonic: isMnemonicValid ? null : mnemonicInvalidErr,
        derivationPath: isDerivationPathValid ? null : t`Derivation path is invalid`,
      }
    }

    const xpubFromMnemonic: string = getXPUBFromMnemonic(mnemonicLower, passphrase, derivPath)
    const isXPUBEqual: boolean = (bip32XPublicKey === xpubFromMnemonic)

    if (!isXPUBEqual) {
      return {
        mnemonic: t`Entered data is not for this wallet`,
      }
    }

    return {}
  }
}

function mapStateToProps(state: AppState) {
  const wallets: Wallets = selectWalletsItems(state)
  const activeWalletId: ?WalletId = selectActiveWalletId(state)
  const wallet: Wallet = getWallet(wallets, activeWalletId)

  const {
    isLoading,
    isInvalidPassword,
  }: UpgradeState = selectUpgrade(state)

  const {
    type,
    xpub,
    address,
    isReadOnly,
  }: Wallet = wallet

  return {
    onClose: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    ),
    isLoading,
    isReadOnly,
    isInvalidPassword,
    isMnemonic: checkMnemonicType(type),
    validateMnemonic: validateMnemonic(xpub),
    validatePrivateKey: validatePrivateKey(address),
  }
}

const mapDispatchToProps = {
  onSubmitMnemonic,
  onSubmitPrivateKey,
}

export default connect< Props, OwnPropsEmpty, _, _, _, _ >(
  mapStateToProps,
  mapDispatchToProps,
)(UpgradeView)
