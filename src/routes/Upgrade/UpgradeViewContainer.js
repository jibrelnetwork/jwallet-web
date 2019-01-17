// @flow

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import getWallet from 'utils/wallets/getWallet'
import reactRouterBack from 'utils/browser/reactRouterBack'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import { selectUpgrade } from 'store/selectors/upgrade'

import {
  checkPrivateKeyValid,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  checkMnemonicValid,
  getXPubFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

import UpgradeView from './UpgradeView'

import {
  submitMnemonicRequest as onSubmitMnemonic,
  submitPrivateKeyRequest as onSubmitPrivateKey,
} from './modules/upgrade'

function validatePrivateKey(address: ?Address) {
  return ({ privateKey }: UpgradePrivateKeyFormFieldValues): UpgradePrivateKeyFormFieldErrors => {
    if (!address) {
      throw new Error('WalletDataError')
    }

    const privateKeyInvalidErr: string = 'Private key is invalid'

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
        privateKey: 'Entered data is not for this wallet',
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
      throw new Error('WalletDataError')
    }

    const mnemonicInvalidErr: string = 'Mnemonic is invalid'

    if (!mnemonic) {
      return {
        mnemonic: mnemonicInvalidErr,
      }
    }

    const mnemonicLower: string = mnemonic.trim().toLowerCase()
    const isMnemonicValid: boolean = checkMnemonicValid(mnemonicLower)
    const isDeriPathValid: boolean = !derivationPath || checkDerivationPathValid(derivationPath)

    if (!(isMnemonicValid && isDeriPathValid)) {
      return {
        mnemonic: isMnemonicValid ? null : mnemonicInvalidErr,
        derivationPath: isDeriPathValid ? null : 'Derivation path is invalid',
      }
    }

    const xpubFromMnemonic: string = getXPubFromMnemonic(mnemonicLower, {
      passphrase,
      derivationPath,
    })

    const isXPUBEqual: boolean = (bip32XPublicKey === xpubFromMnemonic)

    if (!isXPUBEqual) {
      return {
        mnemonic: 'Entered data is not for this wallet',
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
    address,
    isReadOnly,
    bip32XPublicKey,
  }: Wallet = wallet

  return {
    isLoading,
    isReadOnly,
    isInvalidPassword,
    isMnemonic: checkMnemonicType(type),
    validatePrivateKey: validatePrivateKey(address),
    validateMnemonic: validateMnemonic(bip32XPublicKey),
  }
}

const mapDispatchToProps = {
  onSubmitMnemonic,
  onSubmitPrivateKey,
  onUnavailable: () => replace('/digital-assets'),
  onClose: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(UpgradeView)
