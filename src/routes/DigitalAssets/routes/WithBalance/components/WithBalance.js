// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import DigitalAssets from 'components/__new__/DigitalAssets'

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

  const assetsWithBalance: DigitalAssets = getAssetsWithBalance(items, balances)
  const filteredAssets: DigitalAssets = filterAssets(assetsWithBalance, foundAssets, searchQuery)

  return (
    <div className='with-balance-view'>
      {isEmpty(filteredAssets) ? (
        <div>{'Some message about empty list'}</div>
      ) : (
        <DigitalAssets
          setActive={setActive}
          items={filteredAssets}
          balances={balances}
          isBalancesLoading={isBalancesLoading}
        />
      )}
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
