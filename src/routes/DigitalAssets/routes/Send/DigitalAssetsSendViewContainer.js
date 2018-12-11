// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'

import {
  selectDigitalAsset,
  selectDigitalAssets,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'
import {
  selectAddressName,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'
import { divDecimals } from 'utils/numbers'
import { getDigitalAssetsWithBalance } from 'utils/digitalAssets'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectBalancesByOwnerAddress } from 'store/selectors/balances'

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

  const networkId: NetworkId = selectCurrentNetworkId(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const assets: DigitalAssets = selectDigitalAssets(state /* , networkId */)

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByOwnerAddress(
    state,
    networkId,
    currentBlockNumber,
    ownerAddress,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    assets,
    assetsBalances,
  )

  const activeAssets: DigitalAssetWithBalance[] = assetsWithBalance
    .map(item => ({
      ...item,
      balance: item.balance ? divDecimals(item.balance.value, item.decimals) : '',
    }))
    .filter((item: DigitalAssetWithBalance): boolean => item.isActive)

  // console.log(activeAssets)

  // get asset symbol
  const asset: ?DigitalAsset = selectDigitalAsset(state, assetAddress)
  const amountCurrency = (asset && asset.symbol) ? asset.symbol : ''

  const feeETH = '0.00'
  const fromName = selectAddressName(state, formFields.ownerAddress)
  const toName = selectAddressName(state, formFields.recepient)

  return {
    step,
    params,
    formFields,
    invalidFields,
    assets: activeAssets,
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
