// @flow strict

import { i18n } from 'i18n/lingui'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'

import {
  getTypeByInput,
  checkReadOnlyType,
} from 'utils/wallets'

import {
  checkPrivateKeyValid,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  checkXkeyValid,
  getXPUBFromXPRV,
  checkMnemonicValid,
  getXPUBFromMnemonic,
  getAddressIndexFromXPUB,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  WalletsItemUpgradeView,
  type Props,
} from './WalletsItemUpgradeView'

type OwnProps = {|
  +walletId: string,
|}

const XPUB_ERROR: string = i18n._(
  'WalletsItemUpgrade.input.data.error.noXprv',
  null,
  { defaults: 'Input XPRV or mnemonic for your current XPUB' },
)

const ADDRESS_ERROR: string = i18n._(
  'WalletsItemUpgrade.input.data.error.noPrivateKey',
  null,
  { defaults: 'Input private key, xprv or mnemonic for your current address' },
)

function getErrorPrivateKeyMessage(
  type: WalletCustomType,
  publicData: string,
  data: string,
): ?string {
  if (type !== 'address') {
    return XPUB_ERROR
  } else if (!checkPrivateKeyValid(data)) {
    return i18n._(
      'WalletsItemUpgrade.input.data.error.invalidPrivateKey',
      null,
      { defaults: 'Invalid private key' },
    )
  } else if (getAddressFromPrivateKey(data) !== publicData) {
    return ADDRESS_ERROR
  }

  return null
}

function getErrorXPRVMessage(
  type: WalletCustomType,
  publicData: string,
  data: string,
): ?string {
  if (!checkXkeyValid(data, 'prv')) {
    return i18n._(
      'WalletsItemUpgrade.input.data.error.invalidXprv',
      null,
      { defaults: 'Invalid XPRV' },
    )
  }

  const xpub: string = getXPUBFromXPRV(data)

  switch (type) {
    case 'xpub': {
      if ((xpub !== publicData)) {
        return XPUB_ERROR
      }

      break
    }

    case 'address': {
      if (getAddressIndexFromXPUB(publicData, xpub) === -1) {
        return i18n._(
          'WalletsItemUpgrade.input.data.error.invalidXPRVForAddress',
          null,
          { defaults: 'Entered XPRV doesn\'t suit for current address-based wallet' },
        )
      }

      break
    }

    default:
      return null
  }

  return null
}

function getErrorMnemonicMessage(
  type: WalletCustomType,
  publicData: string,
  data: string,
  passphrase: ?string,
  derivationPath: ?string,
): ?string {
  if (!checkMnemonicValid(data)) {
    return i18n._(
      'WalletsItemUpgrade.input.data.error.invalidMnemonic',
      null,
      { defaults: 'Invalid mnemonic' },
    )
  } else if (!checkDerivationPathValid((derivationPath || '').trim())) {
    return null
  }

  const xpub: string = getXPUBFromMnemonic(
    data,
    passphrase,
    derivationPath,
  )

  switch (type) {
    case 'xpub': {
      if ((xpub !== publicData)) {
        return XPUB_ERROR
      }

      break
    }

    case 'address': {
      if (getAddressIndexFromXPUB(publicData, xpub) === -1) {
        return i18n._(
          'WalletsItemUpgrade.input.data.error.invalidMnemonicForAddress',
          null,
          { defaults: 'Entered mnemonic doesn\'t suit for current address-based wallet' },
        )
      }

      break
    }

    default:
      return null
  }

  return null
}

export function getErrorDataMessage(
  type: WalletCustomType,
  publicData: string,
  {
    data,
    passphrase,
    derivationPath,
  }: FormFields,
): ?string {
  const inputData: string = (data || '').trim()

  if (!inputData) {
    return i18n._(
      'WalletsItemUpgrade.input.data.error.empty',
      null,
      { defaults: 'The field should not be empty' },
    )
  }

  const dataType: ?WalletCustomType = getTypeByInput(inputData)

  if (!checkReadOnlyType(type)) {
    return i18n._(
      'WalletsItemUpgrade.input.data.error.cantunlock',
      null,
      { defaults: 'You can\'t unlock not read only wallet' },
    )
  }

  switch (dataType) {
    case 'privateKey':
      return getErrorPrivateKeyMessage(
        type,
        publicData,
        inputData,
      )

    case 'xprv':
      return getErrorXPRVMessage(
        type,
        publicData,
        inputData,
      )

    case 'mnemonic':
      return getErrorMnemonicMessage(
        type,
        publicData,
        inputData,
        passphrase,
        derivationPath,
      )

    default:
      break
  }

  switch (type) {
    case 'address':
      return ADDRESS_ERROR
    case 'xpub':
      return XPUB_ERROR
    default:
      return null
  }
}

function mapStateToProps(
  state: AppState,
  { walletId }: OwnProps,
) {
  const {
    id,
    customType,
    xpub,
    address,
  }: Wallet = walletsPlugin.getWallet(walletId)

  return {
    walletId: id,
    type: customType,
    hint: selectPasswordHint(state),
    publicData: ((customType === 'xpub') ? xpub : address) || '',
  }
}

const mapDispatchToProps = {
  goTo: (routeName: string) => actions.navigateTo(routeName),
}

export const WalletsItemUpgrade = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletsItemUpgradeView)
