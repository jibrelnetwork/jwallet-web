// @flow

import { connect } from 'react-redux'

import {
  selectWalletsItems,
} from 'store/selectors/wallets'

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
