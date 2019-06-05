// @flow

import { connect } from 'react-redux'
import { t } from 'ttag'

import {
  generateAddresses,
} from 'utils/mnemonic'

import {
  selectWalletsItems,
} from 'store/selectors/wallets'

import {
  RecipientPicker,
  type Props,
  type RecipientPickerWallet,
} from './RecipientPicker'

type OwnProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
|}

export function prepareWallets(
  wallets: Wallet[],
  walletBalances: Object = {},
  addressNames: Object = {},
): RecipientPickerWallet[] {
  return wallets.map((wallet) => {
    const {
      xpub,
      isSimplified,
      isReadOnly,
      addressIndex,
    } = wallet

    const derivationIndex = 0

    if (xpub) {
      if (isSimplified) {
        const walletAddresses = generateAddresses(
          xpub,
          addressIndex,
          addressIndex + 1,
        )
        const address = walletAddresses[0]

        return {
          type: 'address',
          addresses: [{
            address,
            name: addressNames[address] || '',
            fiatBalance: undefined,
          }],
          id: wallet.id,
          name: wallet.name,
        }
      } else {
        const walletAddresses = generateAddresses(
          xpub,
          0,
          derivationIndex,
        ).map((address, index) => ({
          address,
          name: addressNames[address] || t`Address ${index + 1}`, // TODO: use function for this
          fiatBalance: walletBalances[address],
        }))

        return {
          type: 'mnemonic',
          id: wallet.id,
          addresses: walletAddresses,
          name: wallet.name,
        }
      }
    } else if (isReadOnly && wallet.address) {
      const { address } = wallet

      return {
        type: 'read-only',
        addresses: [{
          address,
          name: addressNames[address] || '',
          fiatBalance: undefined,
        }],
        id: wallet.id,
        name: wallet.name,
      }
    } else {
      return null
    }
  }).filter(Boolean)
}

function mapStateToProps(state: AppState) {
  const walletItems = selectWalletsItems(state)
  // const activeWalletId = selectActiveWalletId(state)

  // console.log('walletItems', walletItems)

  // #TODO: remove active wallet and address from walletItems

  return {
    // to be implemented when addresses functionality will be available
    contacts: [],
    wallets: prepareWallets(walletItems),
  }
}

export const ConnectedRecipientPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(RecipientPicker)
