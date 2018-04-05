// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import searchDigitalAssets from 'utils/digitalAssets/searchDigitalAssets'
import { DigitalAssets, DigitalAssetsEmpty } from 'components'

const getAssetsWithBalance = (items: DigitalAssets, balances: Balances): DigitalAssets => {
  return items.filter(({ address }: DigitalAsset): boolean => (balances[address] > 0))
}

const WithBalance = ({
  setActive,
  items,
  balances,
  foundAssets,
  searchQuery,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return <div className='with-balance-view'>{'Loading'}</div>
  }

  const withBalance: DigitalAssets = getAssetsWithBalance(items, balances)
  const foundItems: DigitalAssets = searchDigitalAssets(withBalance, foundAssets, searchQuery)

  if (isEmpty(foundItems)) {
    return <DigitalAssetsEmpty />
  }

  return (
    <div className='with-balance-view'>
      <DigitalAssets
        setActive={setActive}
        items={foundItems}
        balances={balances}
        isBalancesLoading={isBalancesLoading}
      />
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

export default WithBalance
