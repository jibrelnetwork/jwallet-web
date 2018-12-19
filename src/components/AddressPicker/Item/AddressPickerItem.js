// @flow

import React from 'react'
import classNames from 'classnames'

import { formatBalance } from 'utils/numbers'
import { JText } from 'components/base'

type Props = {|
  +asset: DigitalAsset,
  +address: Address,
  +title: string,
  +balance: ?Balance,
  // +fiatBalance: ?FiatBalance,
  +isSelected: boolean,
|}

function AddressPickerItem({
  address,
  title,
  asset,
  balance,
  // fiatBalance,
  isSelected,
}: Props) {
  const balanceStr = (address && balance && !balance.isLoading && !balance.isError)
    ? `: ${formatBalance(balance.value)} ${asset.symbol}`
    : ''

  return (
    <div className={classNames(
      'address-picker-item',
      isSelected && '-active'
    )}
    >
      <div className='info'>
        <div className='symbol'>
          <div className='wrap'>
            {/* <JIcon icon='add'/> */}
            {/* <JAssetSymbol symbol={asset.symbol} color={isSelected ? 'blue' : 'gray'} /> */}
          </div>
        </div>
        <div className='name'>
          <JText value={title} color='gray' weight='bold' whiteSpace='wrap' />
        </div>
        <div className='balance'>
          <JText value={address + balanceStr} color='gray' whiteSpace='wrap' />
        </div>
        {/* <div className='fiat-balance'>
          <JText ... />
        </div> */}
      </div>
    </div>
  )
}

AddressPickerItem.defaultProps = {
  balance: null,
  isSelected: false,
  // fiatBalance: null,
}

export default AddressPickerItem
