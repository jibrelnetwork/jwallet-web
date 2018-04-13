// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import { filterDigitalAssets, searchDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'
import Loading from './Loading'

const DigitalAssets = ({
  setActive,
  editCustomAsset,
  items,
  balances,
  foundAssets,
  searchQuery,
  color,
  type,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return <Loading />
  }

  const filteredItems: DigitalAssets = filterDigitalAssets(items, balances, type)
  const foundItems: DigitalAssets = searchDigitalAssets(filteredItems, foundAssets, searchQuery)

  if (isEmpty(foundItems)) {
    return <Empty color={color} />
  }

  return (
    <div className={`digital-assets -${color}`}>
      {foundItems.map((data: DigitalAsset, index: Index) => (
        <Asset
          {...data}
          key={index}
          setActive={setActive}
          edit={editCustomAsset}
          balance={(type !== 'popular') ? balances[data.address] : undefined}
          color={color}
        />
      ))}
    </div>
  )
}

type Props = {
  setActive: Function,
  editCustomAsset: Function,
  items: Array<DigitalAsset>,
  balances: Balances,
  foundAssets: Addresses,
  searchQuery: string,
  type: DigitalAssetsListType,
  color: 'blue' | 'white',
  isBalancesLoading: boolean,
}

DigitalAssets.defaultProps = {
  setActive: () => {},
  editCustomAsset: () => {},
  items: [],
  balances: {},
  foundAssets: [],
  searchQuery: '',
  color: 'white',
  type: 'balance',
  isBalancesLoading: false,
}

export default DigitalAssets
