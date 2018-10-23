// @flow

import React, { PureComponent } from 'react'

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
  +isLoadingError: boolean,
|}

type AssetsState = {
  isHovered: boolean,
}

class AssetCard extends PureComponent<Props, AssetsState> {
  static defaultProps = {
    isLoading: false,
    isLoadingError: false,
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
      isLoadingError,
    } = this.props

    const {
      isHovered,
    } = this.state

    const isLoadingContext = isLoading ? 'loading' : (isLoadingError ? 'error-loading' : null)

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
        {(() => {
          switch (isLoadingContext) {
            case 'error-loading':
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
                      symbol={symbol}
                      balance={balance}
                    />
                  </div>
                  {!isHovered ? (
                    <div className='fiat'>
                      {fiatBalance !== 0 ? (
                        <AssetBalance
                          color='blue'
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
