// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import searchDigitalAssets from 'utils/digitalAssets/searchDigitalAssets'
import { DigitalAssets, DigitalAssetsEmpty } from 'components'

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

  const withoutBalance: DigitalAssets = getAssetsWithoutBalance(items, balances)
  const foundItems: DigitalAssets = searchDigitalAssets(withoutBalance, foundAssets, searchQuery)

  if (isEmpty(foundItems)) {
    return <DigitalAssetsEmpty />
  }

  return (
    <div className='popular-view'>
      <DigitalAssets setActive={setActive} items={foundItems} />
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
