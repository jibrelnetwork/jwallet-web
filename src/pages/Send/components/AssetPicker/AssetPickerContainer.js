// @flow

import { connect } from 'react-redux'

import { getDigitalAssetsWithBalance } from 'utils/digitalAssets'

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import {
  AssetPicker,
  type Props,
} from './AssetPicker'

type OwnProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +className?: string,
|}

function mapStateToProps(state: AppState) {
  const networkId = selectCurrentNetworkId(state)
  const ownerAddress = selectActiveWalletAddress(state)
  const activeAssets = selectActiveDigitalAssets(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0

  const assetsBalances = ownerAddress
    ? selectBalancesByBlockNumber(
      state,
      networkId,
      ownerAddress,
      currentBlockNumber.toString(),
    )
    : null

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    activeAssets,
    assetsBalances,
  )

  console.log('assetsWithBalance', assetsWithBalance)

  return {
    fiatCurrency: 'USD',
    digitalAssets: assetsWithBalance,
  }
}

export const ConnectedAssetPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AssetPicker)
