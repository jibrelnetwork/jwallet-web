// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'
import {
  // selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import DigitalAssetsSendConfirmView from './DigitalAssetsSendConfirmView'

import {
  openView,
  formSubmit,
} from './modules/digitalAssetsSendConfirm'

const mapStateToProps = (state: AppState) => {
  const {
    formFields: {
      // assetAddress,
      ownerAddress: fromAddress,
      recepientAddress: toAddress,
      amount,
    },
  } = selectDigitalAssetsSend(state)

  // const asset: ?DigitalAsset = selectDigitalAsset(state, assetAddress)
  // if (!asset) {
  //   // seems, it is impossible, because was checked on the previous step
  //   throw new Error('Asset not found')
  // }

  return {
    // networkId,
    fromName: 'TODO',
    fromAddress,
    toName: 'TODO',
    feeETH: '0 (TODO)',
    toAddress,
    amount,
    amountCurrency: 'ETH', // asset.symbol,
    passwordError: '',
    isLoading: false,
  }
}

const mapDispatchToProps = {
  openView,
  passwordSubmit: formSubmit,
  closeClick: reactRouterBack({ fallbackUrl: '/digital-assets/send' }),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendConfirmView)
