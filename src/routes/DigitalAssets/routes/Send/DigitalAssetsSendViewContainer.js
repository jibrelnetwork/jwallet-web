// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { getDigitalAssetsWithBalance } from 'utils/digitalAssets'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'

import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
  selectActiveDigitalAssets,
} from 'store/selectors/digitalAssets'

import DigitalAssetsSendView from './DigitalAssetsSendView'

import {
  setField,
  openView,
  closeView,
  submitSendForm,
  submitPasswordForm,
} from './modules/digitalAssetsSend'

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const activeAssets: DigitalAsset[] = selectActiveDigitalAssets(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0

  const {
    step,
    formFields,
    invalidFields,
    isProcessing,
  } = selectDigitalAssetsSend(state)

  const {
    amount,
    recepient,
    assetAddress,
  } = formFields

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    currentBlockNumber.toString(),
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    activeAssets,
    assetsBalances,
  )

  const addressNames: AddressNames = selectAllAddressNames(state)
  const asset: ?DigitalAsset = selectDigitalAsset(state, assetAddress)

  return {
    addressNames,
    formFields,
    invalidFields,
    assets: assetsWithBalance,
    feeETH: '0.00',
    toName: addressNames[recepient] || '',
    amountCurrency: (asset && asset.symbol) ? asset.symbol : '',
    fromName: ownerAddress ? addressNames[ownerAddress] || '' : '',
    step,
    amount,
    isLoading: isProcessing,
  }
}

const mapDispatchToProps = {
  setField,
  openView,
  closeView,
  submitSendForm,
  submitPasswordForm,
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

/* ::
type OwnProps = {|
  +params: {
    +to?: string,
    +asset?: string,
    +txhash?: string,
  }
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)
