// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { JCard, JLoader } from 'react-components'

import { filterDigitalAssets, searchDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

const DigitalAssets = ({
  hover,
  setActive,
  editCustomAsset,
  items,
  foundAssets,
  balances,
  type,
  color,
  searchQuery,
  hoveredAsset,
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
        <JCard key={index}>
          <Asset
            {...data}
            hover={hover}
            setActive={setActive}
            edit={editCustomAsset}
            color={color}
            balance={balances[data.address]}
            isPopular={type === 'popular'}
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
  foundAssets: Addresses,
  items: Array<DigitalAsset>,
  balances: Balances,
  searchQuery: string,
  hoveredAsset: ?Address,
  color: 'blue' | 'white',
  type: DigitalAssetsListType,
  isBalancesLoading: boolean,
}

export default DigitalAssets
