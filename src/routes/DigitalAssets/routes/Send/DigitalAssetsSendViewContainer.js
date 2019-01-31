// @flow

import { connect } from 'react-redux'

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { getDigitalAssetsWithBalance } from 'utils/digitalAssets'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'
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
  setNonceEditable,
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
    formFieldWarnings,
    sendAssetError,
    priority,
    currentStep,
    isLoading,
    finalGasValues,
    isPotentiallyFail,
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
  const fiatCurrency: FiatCurrency = selectSettingsFiatCurrency(state)

  return {
    addressNames,
    selectedAsset,
    formFieldValues,
    formFieldErrors,
    formFieldWarnings,
    sendAssetError,
    priority,
    ownerAddress,
    currentStep,
    isLoading,
    digitalAssets: assetsWithBalance,
    gasValues: finalGasValues,
    isPotentiallyFail,
    fiatCurrency,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setPriority,
  goToNextStep,
  goToPrevStep,
  setFormFieldValue,
  setNonceEditable,
}

/* ::
type OwnProps = {|
  +location: {|
    +search: string,
  |},
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)
