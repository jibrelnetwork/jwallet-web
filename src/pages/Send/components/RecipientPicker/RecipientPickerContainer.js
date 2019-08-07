// @flow

import { connect } from 'react-redux'

import {
  selectWalletsItems,
} from 'store/selectors/wallets'
import {
  selectFavoritesItems,
} from 'store/selectors/favorites'

import {
  RecipientPicker,
  type Props,
} from './RecipientPicker'

import { prepareWallets } from './prepareWallets'

type OwnProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
|}

function mapStateToProps(state: AppState) {
  const walletItems = selectWalletsItems(state)
  const contactItems = selectFavoritesItems(state)

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
    // to be implemented when addresses functionality will be available
    contacts,
    wallets: prepareWallets(walletItems),
  }
}

export const ConnectedRecipientPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(RecipientPicker)
