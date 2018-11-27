// @flow

import React, { Component } from 'react'

import TransactionItem from 'components/TransactionItem'

import TransactionsListEmpty from './Empty'

type Props = {|
  +items: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +assetAddress: ?string,
  +blockExplorerSubdomain: string,
  +ownerAddress: OwnerAddress,
|}

type ComponentState = {
  +activeItems: Hashes,
}

class TransactionsList extends Component<Props, ComponentState> {
  static defaultProps = {
    assetAddress: null,
  }

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
      assetAddress,
      ownerAddress,
      blockExplorerSubdomain,
    }: Props = this.props

    if (!items.length) {
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
            blockExplorerSubdomain={blockExplorerSubdomain}
            isAssetList={!!assetAddress}
            isActive={activeItems.includes(item.hash)}
            isReceived={ownerAddress.toLowerCase() === item.to.toLowerCase()}
          />
        ))}
      </div>
    )
  }
}

export default TransactionsList
