// @flow strict

import { connect } from 'react-redux'

import { selectFavoritesItems } from 'store/selectors/favorites'

import {
  selectAddressNames,
  selectWalletsItems,
} from 'store/selectors/wallets'

import { prepareWallets } from './prepareWallets'

import {
  type Props,
  RecipientPicker,
} from './RecipientPicker'

type OwnProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
|}

function mapStateToProps(state: AppState) {
  const walletItems: Wallet[] = selectWalletsItems(state)
  const contactItems: Favorites = selectFavoritesItems(state)
  const addressNames: AddressNames = selectAddressNames(state)

  // eslint-disable-next-line fp/no-mutating-methods
  const contacts = Object
    .keys(contactItems)
    .map(address => contactItems[address])
    .filter(Boolean)
    .sort((a, b) => {
      if (!a.name) {
        return 1
      }

      if (!b.name) {
        return -1
      }

      return a.name > b.name ? 1 : -1
    })

  return {
    contacts,
    wallets: prepareWallets(
      walletItems,
      {},
      addressNames,
    ),
  }
}

export const ConnectedRecipientPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(RecipientPicker)
