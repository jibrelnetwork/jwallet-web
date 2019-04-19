// @flow

import React, { PureComponent } from 'react'

import {
  JText,
  JAssetSymbol,
} from 'components/base'

import AssetCardBody from './AssetCardBody'

type Props = {|
  +name: string,
  +symbol: string,
  +address: Address,
  +balance: ?BalanceString,
  // +fiatCurrency: ?FiatCurrency,
  // +fiatBalance: ?string,
  +isError: boolean,
  +isLoading: boolean,
  +isCustom: boolean,
|}

class AssetCard extends PureComponent<Props, *> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    isCustom: false,
    // fiatBalance: '',
  }

  render() {
    const {
      name,
      symbol,
      address,
      balance,
      // fiatCurrency,
      // fiatBalance,
      isError,
      isLoading,
      isCustom,
    } = this.props

    return (
      <div
        className='asset-card'
      >
        <div className='symbol -icon'>
          <JAssetSymbol symbol={symbol} color='gray' isCustom={isCustom} />
        </div>
        <div className='name'>
          <JText value={name} color='dark' weight='bold' size='header' whiteSpace='wrap' />
        </div>
        <AssetCardBody
          // fiatCurrency={fiatCurrency}
          // fiatBalance={fiatBalance}
          address={address}
          symbol={symbol}
          balance={balance}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    )
  }
}

export default AssetCard
