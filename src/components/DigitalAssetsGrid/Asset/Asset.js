// @flow

import React, { PureComponent } from 'react'

import { handle } from 'utils/eventHandlers'
import { JAssetSymbol, JText } from 'components/base'

import AssetCardBody from './AssetCardBody'

type Props = {
  +name: string,
  +symbol: string,
  +address: Address,
  +fiatCurrency: string,
  +balance: number,
  +fiatBalance: number,
  +isError: boolean,
  +isLoading: boolean,
}

type AssetsState = {
  isHovered: boolean,
}

class AssetCard extends PureComponent<Props, AssetsState> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    fiatBalance: 0,
    balance: 0,
    fiatCurrency: 'USD',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  onHover = (isHovered: boolean) => {
    this.setState({ isHovered })
  }

  render() {
    const {
      name,
      symbol,
      address,
      balance,
      fiatCurrency,
      fiatBalance,
      isError,
      isLoading,
    } = this.props

    const {
      isHovered,
    } = this.state

    return (
      <div
        onMouseEnter={handle(this.onHover)(true)}
        onMouseLeave={handle(this.onHover)(false)}
        className='asset-card'
      >
        <div className='symbol'>
          <JAssetSymbol symbol={symbol} color='gray' />
        </div>
        <div className='name'>
          <JText value={name} color='dark' weight='bold' size='header' />
        </div>
        <AssetCardBody
          address={address}
          fiatCurrency={fiatCurrency}
          symbol={symbol}
          balance={balance}
          fiatBalance={fiatBalance}
          isError={isError}
          isLoading={isLoading}
          isHovered={isHovered}
        />
      </div>
    )
  }
}

export default AssetCard
