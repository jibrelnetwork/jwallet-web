// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import { DigitalAssets, DigitalAssetsEmpty } from 'components/__new__'

const filterAssets = (
  items: DigitalAssets,
  foundAssets: Addresses,
  searchQuery: string,
): DigitalAssets => {
  if (!searchQuery) {
    return items
  }

  return items.filter(({ address }: DigitalAsset): boolean => foundAssets.includes(address))
}

const getAssetsWithoutBalance = (items: DigitalAssets, balances: Balances): DigitalAssets => {
  return items.filter(({ address }: DigitalAsset): boolean => (balances[address] === 0))
}

const Popular = ({
  setActive,
  items,
  balances,
  foundAssets,
  searchQuery,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return <div className='popular-view'>{'Loading'}</div>
  }

  const assetsWithoutBalance: DigitalAssets = getAssetsWithoutBalance(items, balances)
  const filteredAssets: DigitalAssets = filterAssets(assetsWithoutBalance, foundAssets, searchQuery)

  if (isEmpty(filteredAssets)) {
    return <DigitalAssetsEmpty />
  }

  return (
    <div className='popular-view'>
      <DigitalAssets setActive={setActive} items={filteredAssets} />
    </div>
  )
}

type Props = {
  setActive: (address: Address) => Dispatch,
  items: DigitalAssets,
  balances: Balances,
  foundAssets: Addresses,
  searchQuery: string,
  isBalancesLoading: boolean,
}

export default Popular
