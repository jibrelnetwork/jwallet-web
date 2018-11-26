// @flow

import React, { Component } from 'react'

import TransactionItem from 'components/TransactionItem'

import TransactionsListEmpty from './Empty'

type Props = {|
  +items: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +ownerAddress: OwnerAddress,
|}

type ComponentState = {
  +activeItems: Hashes,
}

class TransactionsList extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeItems: [],
    }
  }

  setActive = (hash: Hash) => () => {
    const { activeItems }: ComponentState = this.state
    const isFound: boolean = activeItems.includes(hash)

    this.setState({
      activeItems: !isFound
        ? activeItems.concat(hash)
        : activeItems.filter((item: Hash): boolean => (item !== hash)),
    })
  }

  render() {
    const {
      items,
      digitalAssets,
      ownerAddress,
    }: Props = this.props

    if (!items) {
      return (
        <div className='transactions-list'>
          <TransactionsListEmpty />
        </div>
      )
    }

    const { activeItems }: ComponentState = this.state

    return (
      <div className='transactions-list'>

        {items.map((item: TransactionWithAssetAddress) => (
          <TransactionItem
            key={item.hash}
            setActive={this.setActive(item.hash)}
            data={item}
            asset={digitalAssets[item.assetAddress]}
            isActive={activeItems.includes(item.hash)}
            isReceived={ownerAddress.toLowerCase() === item.from}
          />
        ))}
      </div>
    )
  }
}

export default TransactionsList
