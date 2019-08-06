// @flow

import { connect } from 'react-redux'

import { getDigitalAssetsWithBalance } from 'utils/digitalAssets'
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
  const activeAssets = selectActiveDigitalAssets(state)
  const assetsBalances = selectBalancesByBlockNumber(state)

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    activeAssets,
    assetsBalances,
  )

  return {
    // #TODO: Fix after currency page will be added
    fiatCurrency: 'USD',
    digitalAssets: assetsWithBalance,
  }
}

export const ConnectedAssetPicker = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AssetPicker)
