// @flow

import { connect } from 'react-redux'

import { reactRouterBack, flattenWithHelper } from 'utils/browser'

import {
  selectDigitalAsset,
  selectActiveAssetsWithBalance,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import {
  selectAllAddressNames,
} from 'store/selectors/favorites'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  openView,
  closeView,
  setField,
  submitSendForm,
  submitPasswordForm,
} from './modules/digitalAssetsSend'

import DigitalAssetsSendView from './DigitalAssetsSendView'

type OwnProps = {|
  +params: {
    +to?: string,
    +asset?: string,
    +txhash?: string,
  }
|}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const { params } = ownProps // router params
  const {
    step,
    formFields,
    invalidFields,
    isProcessing,
  } = selectDigitalAssetsSend(state)

  const {
    amount,
    assetAddress,
  } = formFields

  const activeAssets = selectActiveAssetsWithBalance(state)
    .map((asset => asset.balance ? {
      ...asset,
      balance: {
        ...asset.balance,
        value: formatBalance(divDecimals(asset.balance.value, asset.decimals)),
      },
    } : asset))

  // get asset symbol
  const asset: ?DigitalAsset = selectDigitalAsset(state, assetAddress)
  const amountCurrency = (asset && asset.symbol) ? asset.symbol : ''

  // get sender and recepient name (for step 2)
  const allAddressNames = selectAllAddressNames(state)
  const fromName = allAddressNames[formFields.ownerAddress] || ''
  const toName = allAddressNames[formFields.recepient] || ''

  const recepientAddresses = flattenWithHelper(allAddressNames, (title, address) => ({
    title,
    address,
  }))

  const feeETH = '0.00'

  return {
    step,
    params,
    formFields,
    invalidFields,
    assets: activeAssets,
    recepientAddresses,
    // step 2
    amount,
    amountCurrency,
    feeETH,
    fromName,
    toName,
    isLoading: isProcessing,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setField,
  submitSendForm,
  submitPasswordForm,
  closeClick: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)
