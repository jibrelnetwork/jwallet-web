// @flow

// FIXME: nobody uses me, remove me after migration to MainMenu component!

import { connect } from 'react-redux'

import getDigitalAssetsWithBalance from 'utils/digitalAssets/getDigitalAssetsWithBalance'
import { selectTickerItems } from 'store/selectors/ticker'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'
import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'

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

function getFiatBalance(
  assets: DigitalAssetWithBalance[],
  fiatCourses: FiatCourses,
  fiatCurrency: FiatCurrency,
): number {
  return assets.reduce((result: number, digitalAsset: DigitalAssetWithBalance): number => {
    const {
      balance,
      priceFeed,
    }: DigitalAssetWithBalance = digitalAsset

    if (!(balance && priceFeed)) {
      return result
    }

    const fiatCourseById: ?FiatCourseById = fiatCourses[priceFeed.currencyID.toString()]

    if (!fiatCourseById) {
      return result
    }

    const fiatCourse: ?FiatCourse = fiatCourseById.latest

    if (!fiatCourse) {
      return result
    }

    const fiatCourseValue: ?string = fiatCourse[fiatCurrency]

    if (!fiatCourseValue) {
      return result
    }

    return result + (parseFloat(fiatCourseValue) * parseFloat(balance.value))
  }, 0)
}

function mapStateToProps(state: AppState) {
  const wallet: ?Wallet = selectActiveWallet(state)
  const fiatCourses: FiatCourses = selectTickerItems(state)
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
    fiatBalance: getFiatBalance(assetsWithBalance, fiatCourses, fiatCurrency.code),
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
  +children: React$Node,
  +routeName: string,
|}
*/

export const MenuLayoutContainer = connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(MenuLayout)
