// @flow strict

import React from 'react'
import { connect } from 'react-redux'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'
import { selectTickerItems } from 'store/selectors/ticker'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import getDigitalAssetsWithBalance from 'utils/digitalAssets/getDigitalAssetsWithBalance'
import {
  checkMnemonicType,
  getMnemonicAddressName,
} from 'utils/wallets'
import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +fiatBalance: number,
  +isMnemonic: boolean,
|}

export function WalletView({
  walletName,
  fiatCurrency,
  mnemonicAddressName,
  isMnemonic,
  fiatBalance,
}: Props) {
  return (
    <JLink
      href='/wallets'
      className={`__wallet ${menuPanelStyle.wallet}`}
    >
      <div className={menuPanelStyle.walletName}>
        {walletName}
      </div>
      {isMnemonic && mnemonicAddressName && (
        <div className={menuPanelStyle.addressName}>
          {mnemonicAddressName}
        </div>
      )}
      <div className={menuPanelStyle.balance}>
        {`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`}
      </div>
      <JIcon
        className={menuPanelStyle.chevron}
        name='arrow-right-use-fill'
        color='white'
      />
    </JLink>
  )
}

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

export const Wallet = connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  (state: AppState) => {
    const wallet = selectActiveWallet(state)
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
      fiatCurrency: fiatCurrency.symbol,
      mnemonicAddressName,
      fiatBalance: getFiatBalance(assetsWithBalance, fiatCourses, fiatCurrency.code),
      isMnemonic,
    }
  },
)(WalletView)
