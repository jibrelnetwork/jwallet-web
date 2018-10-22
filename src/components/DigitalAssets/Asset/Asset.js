// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import ethereum from 'data/assets/ethereum'
import AssetBalance from 'components/AssetBalance'
import { handle } from 'utils/eventHandlers'
import { JAssetSymbol, JFlatButton, JText, JLoader } from 'components/base'

type Props = {|
  +name: string,
  +symbol: string,
  +address: Address,
  +fiatMoney: string,
  +balance: number,
  +fiatBalance: number,
  +isLoading: boolean,
  +isLongLoading: boolean,
|}

type AssetsState = {
  isHovered: boolean,
}

class AssetCard extends PureComponent<Props, AssetsState> {
  static defaultProps = {
    name: ethereum.name,
    symbol: ethereum.symbol,
    address: ethereum.address,
    fiatMoney: 'USD',
    balance: 0,
    fiatBalance: 0,
    isLoading: false,
    isLongLoading: false,
    isHovered: false,
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
      fiatMoney,
      balance,
      fiatBalance,
      isLoading,
      isLongLoading,
    } = this.props

    const {
      isHovered,
    } = this.state

    const isLoadingContext = isLoading ? 'loading' : isLongLoading ? 'long-loading' : null

    return (
      <div
        onMouseEnter={handle(this.onHover)(true)}
        onMouseLeave={handle(this.onHover)(false)}
        className={classNames('asset-card')}
      >
        <div className='symbol'>
          <JAssetSymbol symbol={symbol} color='gray' />
        </div>
        <div className='name'>
          {/*
            @TODO: consultation with the programmer on the size of the text:
            size 'header' has insufficient size
          */}
          <JText value={name} color='dark' weight='bold' size='header' />
        </div>

        {(() => {
          switch (isLoadingContext) {
            case 'long-loading':
              return (
                <div className='balance'>
                  <div className='crypto'>
                    <JText
                      value='Balance loading error'
                      color='gray'
                      weight='bold'
                      whiteSpace='wrap'
                    />
                  </div>
                  <div className='fiat'>
                    <JFlatButton label='Reload asset' color='blue' isHoverOpacity />
                  </div>
                </div>
              )
            case 'loading':
              return (
                <div className='loading'>
                  <JLoader color='blue' />
                </div>
              )
            default:
              return (
                <div className='balance'>
                  <div className='crypto'>
                    <AssetBalance
                      color='gray'
                      weight='bold'
                      symbol={symbol}
                      balance={balance}
                    />
                  </div>
                  {!isHovered ? (
                    <div className='fiat'>
                      {/*
                        @TODO: consultation with the programmer on the size of the text:
                        size 'header' has insufficient size
                      */}
                      {fiatBalance !== '0' ? (
                        <AssetBalance
                          color='blue'
                          weight='bold'
                          size='header'
                          symbol={fiatMoney}
                          balance={fiatBalance}
                        />
                      ) : (
                        <div className='message -transparent'>
                          <JText
                            value='No USD Exchange'
                            color='gray'
                            weight='bold'
                            whiteSpace='wrap'
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='fiat'>
                      <JFlatButton
                        onClick={console.log(address)}
                        label='Show transactions'
                        color='blue'
                        isHoverOpacity
                      />
                    </div>
                  )}
                </div>
              )
          }
        })()}
      </div>
    )
  }
}

export default AssetCard
