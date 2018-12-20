// @flow

import React from 'react'
import classNames from 'classnames'

import { formatBalance } from 'utils/numbers'
import { JAssetSymbol, JText } from 'components/base'

type Props = {|
  +asset: DigitalAssetWithBalance,
  +balance: ?Balance,
  // +fiatBalance: ?FiatBalance,
  +isSelected: boolean,
|}

function AssetPickerItem({
  asset,
  balance,
  // fiatBalance,
  isSelected,
}: Props) {
  const balanceStr = (asset && balance && !balance.isLoading && !balance.isError)
    ? `${formatBalance(balance.value)} ${asset.symbol}`
    : ''

  return (
    <div className={classNames(
      'asset-picker-item',
      isSelected && '-active'
    )}
    >
      <div className='info'>
        <div className='symbol'>
          <div className='wrap'>
            <JAssetSymbol symbol={asset.symbol} color={isSelected ? 'blue' : 'gray'} />
          </div>
        </div>
        <div className='name'>
          <JText value={asset.name} color='gray' weight='bold' whiteSpace='wrap' />
        </div>
      </div>
      {balanceStr &&
        <div className='balance'>
          <JText value={balanceStr} color='blue' weight='bold' whiteSpace='wrap' />
        </div>
      }
    </div>
  )
}

AssetPickerItem.defaultProps = {
  balance: null,
  isSelected: false,
  // fiatBalance: null,
}

export default AssetPickerItem
