// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import formatBalance from 'utils/numbers/formatBalance'

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
      isCustom,
    }: DigitalAssetWithBalance = data

    const balanceStr: string = (balance && balance.value)
      ? `${formatBalance(balance.value)} ${symbol}`
      : ''

    return (
      <div
        className={classNames(
          'digital-assets-send-form-asset-picker-item',
          isSelected && '-active'
        )}
      >
        <div className='info'>
          <div className='symbol'>
            <div className='wrap'>
              {!isCustom ? (
                <JAssetSymbol symbol={symbol} color={isSelected ? 'blue' : 'gray'} />
              ) : (
                <JText
                  value={symbol}
                  color={isSelected ? 'blue' : 'gray'}
                  weight='bold'
                  size='normal'
                  whiteSpace='wrap'
                />
              )}
            </div>
          </div>
          <div className='text'>
            <div className='name'>
              <JText value={name} color='gray' weight='bold' whiteSpace='wrap' />
            </div>
            {balanceStr &&
              <div className='balance'>
                <JText value={balanceStr} color='gray' whiteSpace='wrap' />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsSendFormAssetPickerItem
