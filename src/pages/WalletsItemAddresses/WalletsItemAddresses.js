// @flow strict

import { connect } from 'react-redux'

import { WalletInconsistentDataError } from 'errors'
import { selectWallet } from 'store/selectors/wallets'
import { selectFiatCurrency } from 'store/selectors/user'

import {
  type Props,
  WalletsItemAddressesView,
} from './WalletsItemAddressesView'

type OwnProps = {|
  +walletId: string,
|}

function mapStateToProps(
  state: AppState,
  { walletId }: OwnProps,
) {
  const {
    name,
    customType,
    derivationIndex,
  }: Wallet = selectWallet(state, walletId)

  if (derivationIndex === null) {
    throw new WalletInconsistentDataError('derivationIndex is null')
  }

  return {
    name,
    derivationIndex,
    type: customType,
    fiatCurrency: selectFiatCurrency(state),
  }
}

export const WalletsItemAddresses = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsItemAddressesView)
