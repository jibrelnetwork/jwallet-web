// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import AssetBalance from 'components/AssetBalance'
import { JFlatButton, JText, JLoader } from 'components/base'

type Props = {|
  +symbol: string,
  +address: Address,
  +balance: ?BalanceString,
  +fiatCurrency: ?FiatCurrency,
  +fiatBalance: ?string,
  +isError: boolean,
  +isLoading: boolean,
  +isHovered: boolean
|}

type StateProps = {|
  isHover: boolean,
|}

class AssetCardBody extends PureComponent<Props, StateProps> {
  static defaultProps = {
    isError: false,
    isLoading: false,
    isHovered: false,
    fiatBalance: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isHover: false,
    }
  }

  onHover = (isHover: boolean) => () => this.setState({ isHover })

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

    const {
      isHover,
    }: StateProps = this.state

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
              // eslint-disable-next-line no-console
              onClick={console.log}
            />
          </div>
        </div>
      )
    }

    return (
      <div className={classNames('asset-card-body', isHovered && '-hovered')}>
        <div className='crypto'>
          <AssetBalance
            color='gray'
            symbol={symbol}
            balance={balance}
          />
        </div>
        <div className='fiat'>
          {!fiatBalance ? (
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
                symbol={fiatCurrency}
                balance={fiatBalance}
              />
            </div>
          )}
          <div className='show'>
            <div
              className='link'
              onMouseEnter={this.onHover(true)}
              onMouseLeave={this.onHover(false)}
            >
              <JFlatButton
                to={`/transactions/${address}`}
                color={isHover ? 'sky' : 'blue'}
                label={t`Show transactions`}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AssetCardBody
