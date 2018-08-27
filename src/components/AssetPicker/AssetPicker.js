// @flow

import React from 'react'
import { compose, filter, head, propEq } from 'ramda'
import JSelect, { JSelectItem } from 'react-components/src/components/JSelect'

import Current from './Current'
import Item from './Item'

const getAssetByAddress = (
  address: ?Address,
  assets: Array<DigitalAssetMainDataWithBalance>,
): ?DigitalAssetMainDataWithBalance => {
  return !address ? null : compose(
    head,
    filter(propEq('address', address)),
  )(assets)
}

const AssetPicker = ({
  onSelect,
  activeAssets,
  currentAsset,
  label,
  isLoading,
  isDisabled,
}: Props) => {
  const foundAsset: ?DigitalAssetMainDataWithBalance = getAssetByAddress(currentAsset, activeAssets)

  return (
    <div className='asset-picker'>
      <JSelect
        color='gray'
        label={label}
        isLoading={isLoading}
        isDisabled={isDisabled}
        current={foundAsset ? <Current {...foundAsset} /> : null}
      >
        {activeAssets.map(({ address, symbol, name, balance }: DigitalAssetMainDataWithBalance) => (
          <JSelectItem key={address} onSelect={onSelect} value={address}>
            <Item
              name={name}
              symbol={symbol}
              balance={balance}
              isLoading={isLoading}
              isActive={address === currentAsset}
            />
          </JSelectItem>
        ))}
      </JSelect>
    </div>
  )
}

type Props = {
  onSelect: Function,
  activeAssets: Array<DigitalAssetMainDataWithBalance>,
  currentAsset: ?Address,
  label: string,
  isLoading: boolean,
  isDisabled: boolean,
}

AssetPicker.defaultProps = {
  label: 'Asset',
  isDisabled: false,
}

export default AssetPicker
