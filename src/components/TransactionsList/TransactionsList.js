// @flow

import React, { Component } from 'react'

import JLoader from 'components/base/JLoader'
import TransactionItem from 'components/TransactionItem'

import TransactionsListEmpty from './Empty'

type Props = {|
  +items: TransactionWithPrimaryKeys[],
  +digitalAssets: DigitalAssets,
  +assetAddress: ?string,
  +blockExplorerSubdomain: string,
  +ownerAddress: OwnerAddress,
  +isLoading: boolean,
  // +isFiltered: boolean,
|}

type ComponentState = {
  +activeItems: TransactionId[],
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

  setActive = (id: TransactionId) => () => {
    const { activeItems }: ComponentState = this.state
    const isFound: boolean = activeItems.includes(id)

    this.setState({
      activeItems: !isFound
        ? activeItems.concat(id)
        : activeItems.filter((item: TransactionId): boolean => (item !== id)),
    })
  }

  render() {
    const {
      items,
      digitalAssets,
      assetAddress,
      ownerAddress,
      blockExplorerSubdomain,
      isLoading,
      // isFiltered,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className='transactions-list -empty'>
          <TransactionsListEmpty />
        </div>
      )
    }

    const { activeItems }: ComponentState = this.state

    return (
      <div className='transactions-list'>
        {items.map((item: TransactionWithPrimaryKeys) => {
          const {
            keys,
            from,
          } = item

          return (
            <TransactionItem
              key={keys.id}
              setActive={this.setActive(keys.id)}
              data={item}
              asset={digitalAssets[keys.assetAddress]}
              blockExplorerSubdomain={blockExplorerSubdomain}
              isAssetList={!!assetAddress}
              isActive={activeItems.includes(keys.id)}
              isSent={ownerAddress.toLowerCase() === from.toLowerCase()}
            />
          )
        })}
        {isLoading && (
          <div className='loader'>
            <JLoader color='gray' />
          </div>
        )}
      </div>
    )
  }
}

export default TransactionsList
