// @flow

import React, { PureComponent } from 'react'

import AssetBalance from 'components/AssetBalance'
import { JFlatButton, JText, JLoader } from 'components/base'

type Props = {|
  +symbol: string,
  +address: Address,
  +balance: BalanceString,
  +fiatBalance: number,
  +fiatCurrency: string,
  +isError: boolean,
  +isLoading: boolean,
  +isHovered: boolean
|}

class AssetCardBody extends PureComponent<Props> {
  static defaultProps = {
    balance: '0',
    isError: false,
    isLoading: false,
    isHovered: false,
  }

  render() {
    const {
      symbol,
      address,
      fiatCurrency,
      balance,
      fiatBalance,
      isError,
      isLoading,
      isHovered,
    } = this.props

    if (isLoading) {
      return (
        <div className='loading'>
          <JLoader color='blue' />
        </div>
      )
    }

    if (isError) {
      return (
        <div className='asset-card-body'>
          <div className='crypto'>
            <JText
              color='gray'
              weight='bold'
              whiteSpace='wrap'
              value='Balance loading error'
            />
          </div>
          <div className='fiat'>
            <JFlatButton
              color='blue'
              label='Reload asset'
              isHoverOpacity
              onClick={console.log}
            />
          </div>
        </div>
      )
    }

    return (
      <div className='asset-card-body'>
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
                symbol={fiatCurrency}
                balance={fiatBalance.toString()}
              />
            ) : (
              <div className='message -transparent'>
                <JText
                  value={`No ${fiatCurrency} Exchange`}
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
              to={`/transactions/${address}`}
              color='blue'
              label='Show transactions'
              isHoverOpacity
            />
          </div>
        )}
      </div>
    )
  }
}

export default AssetCardBody
