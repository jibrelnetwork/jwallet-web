// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import handle from 'utils/handle'

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

  return (
    <div className='popular-view'>
      {isEmpty(filteredAssets) ? (
        <div>{'Some message about empty list'}</div>
      ) : (
        <div>
          {filteredAssets.map(({ name, address, symbol, isActive }: DigitalAsset) => (
            <div
              key={symbol}
              onClick={handle(setActive)(address)}
              style={{ margin: '20px' }}
            >
              <div>{name}</div>
              <div>{symbol}</div>
              <div>{isActive ? 'Active' : 'Not active'}</div>
            </div>
          ))}
        </div>
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

export default Popular
