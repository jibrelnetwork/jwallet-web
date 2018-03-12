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
              <div>{(balances[address] === undefined) ? 'Loading' : balances[address]}</div>
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

export default WithBalance
