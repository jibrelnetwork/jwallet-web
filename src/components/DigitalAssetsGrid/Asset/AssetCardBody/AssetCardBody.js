// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'

import AssetBalance from 'components/AssetBalance'

import {
  JText,
  JLoader,
  JFlatButton,
} from 'components/base'

import JTextStyle from 'styles/components/jText.m.scss'

type Props = {|
  +symbol: string,
  +address: Address,
  +balance: ?BalanceString,
  // +fiatCurrency: ?FiatCurrency,
  // +fiatBalance: ?string,
  +isError: boolean,
  +isLoading: boolean,
|}

class AssetCardBody extends PureComponent<Props, *> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    // fiatBalance: '',
  }

  render() {
    const {
      symbol,
      address,
      // fiatCurrency,
      balance,
      // fiatBalance,
      isError,
      isLoading,
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
              value={t`Balance loading error`}
            />
          </div>
          <div className='fiat'>
            <JFlatButton
              color='blue'
              label={t`Reload asset`}
              isHoverOpacity
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
        <div className='fiat'>
          { /* !fiatBalance ? (
            <div className='message -transparent'>
              <JText
                value={t`No ${fiatCurrency} Exchange`}
                color='gray'
                weight='bold'
                whiteSpace='wrap'
              />
            </div>
          ) : (
            <div className='balance'>
              <AssetBalance
                color='blue'
                size='header'
                // symbol={fiatCurrency}
                balance={fiatBalance}
              />
            </div>
          ) */ }
          <div className='show'>
            <Link
              to={`/transactions/${address}`}
              className={classNames(
                'link',
                JTextStyle['j-text'],
                JTextStyle.blue,
                JTextStyle.bold,
                JTextStyle.nowrap)}
            >
              {t`Show transactions`}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default AssetCardBody
