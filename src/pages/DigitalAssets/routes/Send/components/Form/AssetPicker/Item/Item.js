// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JText,
  JAssetSymbol,
} from 'components/base'

type Props = {|
  +data: DigitalAssetWithBalance,
  +isSelected: boolean,
|}

class DigitalAssetsSendFormAssetPickerItem extends PureComponent<Props> {
  render() {
    const {
      data,
      isSelected,
    }: Props = this.props

    const {
      name,
      symbol,
      balance,
      blockchainParams: {
        address,
        decimals,
      },
    }: DigitalAssetWithBalance = data

    const balanceStr: string = (balance && balance.value)
      ? `${formatBalance(divDecimals(balance.value, decimals), 6)} ${symbol}`
      : ''

    return (
      <div
        className={classNames(
          'digital-assets-send-form-asset-picker-item',
          isSelected && '-active',
        )}
      >
        <div className='info'>
          <div className='symbol'>
            <div className='wrap'>
              <JAssetSymbol
                symbol={symbol}
                address={address}
                color={isSelected ? 'blue' : 'gray'}
                size={24}
              />
            </div>
          </div>
          <div className='text'>
            <div className='name'>
              <JText value={name} color='gray' weight='bold' whiteSpace='wrap' />
            </div>
            {balanceStr && (
              <div className='balance'>
                <JText value={balanceStr} color='gray' whiteSpace='wrap' />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsSendFormAssetPickerItem
