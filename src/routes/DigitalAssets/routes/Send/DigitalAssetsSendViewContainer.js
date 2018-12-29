// @flow

import { connect } from 'react-redux'

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
  openView,
  closeView,
  setPriority,
  goToNextStep,
  goToPrevStep,
  setFormFieldValue,
} from './modules/digitalAssetsSend'

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const activeAssets: DigitalAsset[] = selectActiveDigitalAssets(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0

  const {
    formFieldValues,
    formFieldErrors,
    priority,
    currentStep,
    isLoading,
  }: DigitalAssetsSendState = selectDigitalAssetsSend(state)

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
  const selectedAsset: ?DigitalAsset = selectDigitalAsset(state, formFieldValues.assetAddress)

  return {
    addressNames,
    selectedAsset,
    formFieldValues,
    formFieldErrors,
    priority,
    ownerAddress,
    currentStep,
    isLoading,
    digitalAssets: assetsWithBalance,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setPriority,
  goToNextStep,
  goToPrevStep,
  setFormFieldValue,
}

/* ::
type OwnProps = {|
  +params: DigitalAssetsSendRouteParams
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)
