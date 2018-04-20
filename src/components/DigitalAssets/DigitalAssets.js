// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import { JCard, JLoader } from 'components/base'
import { filterDigitalAssets, searchDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

const DigitalAssets = ({
  hover,
  setActive,
  editCustomAsset,
  items,
  balances,
  foundAssets,
  hoveredAsset,
  searchQuery,
  color,
  type,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return (
      <div className='digital-assets -loading'>
        <JLoader color='blue' />
      </div>
    )
  }

  const filteredItems: DigitalAssets = filterDigitalAssets(items, balances, type)
  const foundItems: DigitalAssets = searchDigitalAssets(filteredItems, foundAssets, searchQuery)

  if (isEmpty(foundItems)) {
    return <Empty color={color} />
  }

  return (
    <div className={`digital-assets -${color}`}>
      {foundItems.map((data: DigitalAsset, index: Index) => (
        <JCard key={index} withShadow>
          <Asset
            {...data}
            hover={hover}
            setActive={setActive}
            edit={editCustomAsset}
            balance={(type !== 'popular') ? balances[data.address] : undefined}
            color={color}
            isHovered={hoveredAsset === data.address}
          />
        </JCard>
      ))}
    </div>
  )
}

type Props = {
  hover: Function,
  setActive: Function,
  editCustomAsset: Function,
  items: Array<DigitalAsset>,
  balances: Balances,
  foundAssets: Addresses,
  hoveredAsset: ?Address,
  searchQuery: string,
  type: DigitalAssetsListType,
  color: 'blue' | 'white',
  isBalancesLoading: boolean,
}

DigitalAssets.defaultProps = {
  hover: () => {},
  setActive: () => {},
  editCustomAsset: () => {},
  items: [],
  balances: {},
  foundAssets: [],
  hoveredAsset: null,
  searchQuery: '',
  color: 'white',
  type: 'balance',
  isBalancesLoading: false,
}

export default DigitalAssets
