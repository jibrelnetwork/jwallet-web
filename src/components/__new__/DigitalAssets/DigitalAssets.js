// @flow

import React from 'react'
import classNames from 'classnames'

import AssetCard from 'components/__new__/AssetCard'

const DigitalAssets = ({
  setActive,
  items,
  balances,
  color,
  isBalancesLoading,
}: Props) => (
  <div className={classNames('digital-assets', (color && `-${color}`))}>
    {items.map((data: DigitalAsset, index: Index) => (
      <AssetCard
        {...data}
        key={index}
        setActive={setActive}
        balance={balances ? balances[data.address] : undefined}
        color={color}
        isLoading={isBalancesLoading}
      />
    ))}
  </div>
)

type Props = {
  setActive: Function,
  items: Array<DigitalAsset>,
  balances?: Balances,
  color?: 'blue' | 'white',
  isBalancesLoading?: boolean,
}

DigitalAssets.defaultProps = {
  balances: {},
  color: 'white',
  isBalancesLoading: false,
}

export default DigitalAssets
