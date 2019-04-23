// @flow strict

import React from 'react'
import { connect } from 'react-redux'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'
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
import { getFiatBalance } from 'store/utils/getFiatBalances'

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

function getTotalFiatBalance(state: AppState, assets: DigitalAssetWithBalance[]): number {
  return assets.reduce((result: number, digitalAsset: DigitalAssetWithBalance): number =>
    result + (getFiatBalance(state, digitalAsset) || 0), 0)
}

export const Wallet = connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  (state: AppState) => {
    const wallet = selectActiveWallet(state)
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
      fiatBalance: getTotalFiatBalance(state, assetsWithBalance),
      isMnemonic,
    }
  },
)(WalletView)
