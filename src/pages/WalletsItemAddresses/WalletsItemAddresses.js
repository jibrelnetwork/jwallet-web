// @flow strict

import { connect } from 'react-redux'

import { WalletInconsistentDataError } from 'errors'
import { selectWalletOrThrow } from 'store/selectors/wallets'

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
    isSimplified,
  }: Wallet = selectWalletOrThrow(state, walletId)

  /**
   * @TODO: get address names and balances
   */

  if (derivationIndex === null) {
    throw new WalletInconsistentDataError('derivationIndex is null')
  }

  return {
    name,
    derivationIndex,
    isSimplified,
    type: customType,
  }
}

export const WalletsItemAddresses = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsItemAddressesView)
