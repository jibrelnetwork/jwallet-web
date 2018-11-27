// @flow

import React, { Component } from 'react'

import JLoader from 'components/base/JLoader'
import TransactionItem from 'components/TransactionItem'

import TransactionsListEmpty from './Empty'

type Props = {|
  +items: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +assetAddress: ?string,
  +blockExplorerSubdomain: string,
  +ownerAddress: OwnerAddress,
  +isSyncing: boolean,
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
      isSyncing,
    }: Props = this.props

    if (!items.length) {
      return (
        <div className='transactions-list -empty'>
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
        {isSyncing && (
          <div className='loader'>
            <JLoader color='gray' />
          </div>
        )}
      </div>
    )
  }
}

export default TransactionsList
