// @flow

import React from 'react'

import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import JSelect, { JSelectItem } from 'components/base/JSelect'

import Current from './Current'
import Item from './Item'

const AssetPicker = ({ onSelect, items, balances, currentAsset, label, disabled }: Props) => {
  const foundAsset: ?DigitalAsset = getDigitalAssetByAddress(currentAsset, items)

  return (
    <div className='asset-picker'>
      <JSelect
        label={label}
        color='gray'
        disabled={disabled}
        current={!foundAsset ? null : (
          <Current
            name={foundAsset.name}
            symbol={foundAsset.symbol}
            balance={currentAsset ? balances[currentAsset] : 0}
          />
        )}
      >
        {items.map(({ address, symbol, name }: DigitalAsset) => (
          <JSelectItem key={address} onSelect={onSelect} value={address}>
            <Item
              name={name}
              symbol={symbol}
              balance={balances[address]}
              active={address === currentAsset}
            />
          </JSelectItem>
        ))}
      </JSelect>
    </div>
  )
}

type Props = {
  onSelect: Function,
  items: DigitalAssets,
  balances: Balances,
  currentAsset: ?Address,
  label: string,
  disabled: boolean,
}

AssetPicker.defaultProps = {
  onSelect: () => {},
  items: [],
  balances: {},
  currentAsset: null,
  label: 'Asset',
  disabled: false,
}

export default AssetPicker
