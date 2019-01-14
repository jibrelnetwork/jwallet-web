// @flow

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import getWallet from 'utils/wallets/getWallet'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import { selectUpgrade } from 'store/selectors/upgrade'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

import UpgradeView from './UpgradeView'

import {
  submitMnemonicRequest as onSubmitMnemonic,
  submitPrivateKeyRequest as onSubmitPrivateKey,
} from './modules/upgrade'

const validatePrivateKey = (
  { privateKey }: UpgradePrivateKeyFormFieldValues
): UpgradePrivateKeyFormFieldErrors => {
  if (!privateKey) {
    return {
      privateKey: 'Private key is required',
    }
  }

  if (privateKey.length < 64) {
    return {
      privateKey: `${privateKey.length} characters is too short! Private key is 64 characters`,
    }
  }

  return {}
}

const validateMnemonic = (
  {
    mnemonic,
    derivationPath,
  }: UpgradeMnemonicFormFieldValues
): UpgradeMnemonicFormFieldErrors => {
  /* eslint-disable fp/no-mutation */
  const errors = {}

  if (!mnemonic) {
    errors.mnemonic = 'Mnemonic is required'
  }

  if (derivationPath) {
    // FIXME: should validate derivation path
  }

  return errors
  /* eslint-enable fp/no-mutation */
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
    isReadOnly,
  }: Wallet = wallet

  return {
    isLoading,
    isReadOnly,
    isInvalidPassword,
    isMnemonic: checkMnemonicType(type),
    validateMnemonic,
    validatePrivateKey,
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
