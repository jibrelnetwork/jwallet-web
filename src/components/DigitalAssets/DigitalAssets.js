// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import { JCard, JLoader } from 'components/base'
import { filterDigitalAssets, filterFoundDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

const DigitalAssetsList = ({
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

  const filtered: DigitalAssets = filterDigitalAssets(items, balances, type)
  const foundItems: DigitalAssets = filterFoundDigitalAssets(filtered, foundAssets, searchQuery)

  if (isEmpty(foundItems)) {
    return <Empty color={color} />
  }

  return (
    <div className={`digital-assets -${color}`}>
      {foundItems.map((data: DigitalAsset) => (
        <JCard key={data.address}>
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

DigitalAssetsList.defaultProps = {
  hover: () => {},
  setActive: () => {},
  editCustomAsset: () => {},
  items: [],
  foundAssets: [],
  balances: {},
  color: 'white',
  type: 'balance',
  searchQuery: '',
  hoveredAsset: null,
  isBalancesLoading: false,
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

export default DigitalAssetsList
