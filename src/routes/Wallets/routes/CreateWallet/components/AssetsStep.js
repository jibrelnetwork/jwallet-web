// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { Link } from 'react-router'

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

const AssetsStep = ({
  setActive,
  items,
  balances,
  foundAssets,
  searchQuery,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return <div className='create-wallet-assets-step'>{'Loading'}</div>
  }

  const filteredAssets: DigitalAssets = filterAssets(items, foundAssets, searchQuery)

  return (
    <div className='create-wallet-assets-step'>
      {isEmpty(filteredAssets) ? (
        <div>{'Some message about empty list'}</div>
      ) : (
        <DigitalAssets
          setActive={setActive}
          items={filteredAssets}
          balances={balances}
          color='blue'
          isBalancesLoading={isBalancesLoading}
        />
      )}
      <Link to='/'>{i18n('routes.createWallet.buttonTitle.finish')}</Link>
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

export default AssetsStep
