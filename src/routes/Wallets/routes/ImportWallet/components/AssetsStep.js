// @flow

import React from 'react'
import { isEmpty } from 'ramda'

import JButton from 'components/base/__new__/JButton'
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
  goToHome,
  items,
  balances,
  foundAssets,
  searchQuery,
  isBalancesLoading,
}: Props) => {
  if (isBalancesLoading) {
    return <div className='form'>{'Loading'}</div>
  }

  const filteredAssets: DigitalAssets = filterAssets(items, foundAssets, searchQuery)

  return (
    <div className='form'>
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
      <div className='actions'>
        <JButton
          onClick={goToHome}
          text={i18n('routes.importWallet.buttonTitle.finish')}
          color='blue'
          large
          right
        />
      </div>
    </div>
  )
}

type Props = {
  setActive: (address: Address) => Dispatch,
  goToHome: () => Dispatch,
  items: DigitalAssets,
  balances: Balances,
  foundAssets: Addresses,
  searchQuery: string,
  isBalancesLoading: boolean,
}

export default AssetsStep
