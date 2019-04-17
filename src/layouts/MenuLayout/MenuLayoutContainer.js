// @flow

// FIXME: nobody uses me, remove me after migration to MainMenu component!

import { connect } from 'react-redux'

import getDigitalAssetsWithBalance from 'utils/digitalAssets/getDigitalAssetsWithBalance'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'
import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'
import { getFiatBalance } from 'store/utils/getFiatBalances'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  checkMnemonicType,
  getMnemonicAddressName,
} from 'utils/wallets'

import {
  openMenuLayout,
  closeMenuLayout,
} from 'store/modules/core'

import { MenuLayout } from './MenuLayout'

function getTotalFiatBalance(state: AppState, assets: DigitalAssetWithBalance[]): number {
  return assets.reduce((result: number, digitalAsset: DigitalAssetWithBalance): number =>
    result + (getFiatBalance(state, digitalAsset) || 0), 0)
}

function mapStateToProps(state: AppState) {
  const wallet: ?Wallet = selectActiveWallet(state)
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const assets: DigitalAsset[] = selectActiveDigitalAssets(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const fiatCurrency: FiatCurrencyData = selectSettingsFiatCurrencyData(state)

  const balances: ?Balances = selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    assets,
    balances,
  )

  const walletName: string = wallet ? wallet.name : ''
  const isMnemonic: boolean = wallet ? checkMnemonicType(wallet.type) : false

  const mnemonicAddressName: string = (wallet && ownerAddress && isMnemonic)
    ? getMnemonicAddressName(wallet, addressNames[ownerAddress])
    : ''

  return {
    walletName,
    mnemonicAddressName,
    fiatCurrency: fiatCurrency.symbol,
    fiatBalance: getTotalFiatBalance(state, assetsWithBalance),
    isMnemonic,
    isConnectionError: false,
  }
}

const mapDispatchToProps = {
  openLayout: openMenuLayout,
  closeLayout: closeMenuLayout,
}

/* ::
type OwnProps = {|
  +routeName: string,
  +children: React$Node,
|}
*/

export const MenuLayoutContainer = connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(MenuLayout)
