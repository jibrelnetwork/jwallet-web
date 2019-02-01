// @flow

import React, { PureComponent } from 'react'

import { handle } from 'utils/eventHandlers'
import { JAssetSymbol, JText } from 'components/base'

import AssetCardBody from './AssetCardBody'

type Props = {|
  +name: string,
  +symbol: string,
  +address: Address,
  +balance: ?BalanceString,
  +fiatCurrency: ?FiatCurrency,
  +fiatBalance: ?string,
  +isError: boolean,
  +isLoading: boolean,
  +isCustom: boolean,
|}

type AssetsState = {
  isHovered: boolean,
}

class AssetCard extends PureComponent<Props, AssetsState> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    isCustom: false,
    fiatBalance: '',
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
      isCustom,
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
        {!isCustom ? (
          <div className='symbol -icon'>
            <JAssetSymbol symbol={symbol} color='gray' />
          </div>
        ) : (
          <div className='symbol -text'>
            <JText value={symbol} color='blue' weight='bold' size='header' whiteSpace='wrap' />
          </div>
        )}
        <div className='name'>
          <JText value={name} color='dark' weight='bold' size='header' whiteSpace='wrap' />
        </div>
        <AssetCardBody
          fiatCurrency={fiatCurrency}
          fiatBalance={fiatBalance}
          address={address}
          symbol={symbol}
          balance={balance}
          isError={isError}
          isLoading={isLoading}
          isHovered={isHovered}
        />
      </div>
    )
  }
}

export default AssetCard
