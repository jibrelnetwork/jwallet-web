// @flow strict

import React from 'react'
import { connect } from 'react-redux'

import { CURRENCIES } from 'data'
import { getAddressName } from 'utils/address'
import { checkMultiAddressType } from 'utils/wallets'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectTickerItems } from 'store/selectors/ticker'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import {
  getFiatBalance,
  getDigitalAssetsWithBalance,
} from 'utils/digitalAssets'

import {
  selectAddressNames,
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from '../menuPanel.m.scss'

type Props = {|
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +fiatBalance: number,
|}

export function WalletView({
  walletName,
  fiatCurrency,
  mnemonicAddressName,
  fiatBalance,
}: Props) {
  return (
    <JLink
      href='/wallets'
      className={`__wallet ${styles.wallet}`}
    >
      <div className={styles.walletName}>
        {walletName}
      </div>
      {mnemonicAddressName && (
        <div className={styles.addressName}>
          {mnemonicAddressName}
        </div>
      )}
      <div className={styles.balance}>
        {`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`}
      </div>
      <JIcon
        className={styles.chevron}
        name='arrow-right-use-fill'
        color='white'
      />
    </JLink>
  )
}

function getTotalFiatBalance(
  assets: DigitalAssetWithBalance[],
  fiatCourses: FiatCourses,
  fiatCurrency: FiatCurrencyCode,
): number {
  return assets.reduce((
    result: number,
    digitalAsset: DigitalAssetWithBalance,
  ): number => result + (getFiatBalance(
    digitalAsset,
    fiatCourses,
    fiatCurrency,
  ) || 0), 0)
}

function mapStateToProps(state: AppState) {
  const wallet = selectActiveWallet(state)
  const fiatCourses: FiatCourses = selectTickerItems(state)
  const addressNames: AddressNames = selectAddressNames(state)
  const balances: ?Balances = selectBalancesByBlockNumber(state)
  const assets: DigitalAsset[] = selectActiveDigitalAssets(state)
  const fiatCurrency: FiatCurrencyCode = selectFiatCurrency(state)
  const ownerAddress: OwnerAddress = selectActiveWalletAddress(state)

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    assets,
    balances,
  )

  const {
    name,
    customType,
    addressIndex,
    isSimplified,
  } = wallet

  const mnemonicAddressName: string = checkMultiAddressType(customType) && !isSimplified
    ? getAddressName(addressNames[ownerAddress], addressIndex || 0)
    : ''

  return {
    walletName: name,
    mnemonicAddressName,
    fiatCurrency: CURRENCIES[fiatCurrency].symbol,
    fiatBalance: getTotalFiatBalance(
      assetsWithBalance,
      fiatCourses,
      fiatCurrency,
    ),
  }
}

export const Wallet = connect<Props, OwnPropsEmpty, _, _, _, _>(mapStateToProps)(WalletView)
