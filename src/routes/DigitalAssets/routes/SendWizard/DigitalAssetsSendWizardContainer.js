// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  sendTransaction,
  addPendingTransaction,
} from 'store/modules/digitalAssetsSendWizard'

import DigitalAssetsSendWizard from './DigitalAssetsSendWizard'

type OwnProps = {|
  +location: {|
    +search: string,
  |},
|}

const mapStateToProps = (state: AppState) => {
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)

  if (!ownerAddress) {
    throw new Error('InvalidOwnerAddress')
  }

  return {
    owner: ownerAddress,
  }
}

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(push('/digital-assets/grid')),

  // eslint-disable-next-line fp/no-rest-parameters
  sendTransaction: (...args) => dispatch(sendTransaction(...args)),

  // eslint-disable-next-line fp/no-rest-parameters
  addPendingTransaction: (...args) => dispatch(addPendingTransaction(...args)),
})

export default (
  // eslint-disable-next-line no-undef
  connect < AppState, any, OwnProps, _, _ > (mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendWizard)
