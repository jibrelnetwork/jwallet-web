// @flow

import React, { PureComponent } from 'react'

import AssetBalance from 'components/AssetBalance'
import { JFlatButton, JText, JLoader } from 'components/base'

type Props = {|
  +balance: number,
  +fiatBalance: number,
  +symbol: string,
  +fiatCurrency: string,
  +address: Address,
  +isError: boolean,
  +isLoading: boolean,
  +isHovered: boolean
|}

class AssetCardBody extends PureComponent<Props> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    isHovered: false,
  }

  render() {
    const {
      balance,
      fiatBalance,
      symbol,
      fiatCurrency,
      address,
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
            <JFlatButton
              label='Reload asset'
              color='blue'
              isHoverOpacity
              onClick={console.log}
            />
          </div>
        </div>
      )
    }

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
                symbol={fiatCurrency}
                balance={fiatBalance}
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
              onClick={() => console.log(address)}
              label='Show transactions'
              color='blue'
              isHoverOpacity
            />
          </div>
        )}
      </div>
    )
  }
}

export default AssetCardBody
