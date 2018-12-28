// @flow

import React, { Component } from 'react'

import JLoader from 'components/base/JLoader'
import TransactionItem from 'components/TransactionItem'

import TransactionsListEmpty from './Empty'

type Props = {|
  +removeFavorite: (Address) => void,
  +editComment: (CommentId, string) => void,
  +items: TransactionWithPrimaryKeys[],
  +comments: Comments,
  +favorites: AddressNames,
  +addressNames: AddressNames,
  +digitalAssets: DigitalAssets,
  +assetAddress: ?string,
  +blockExplorerSubdomain: string,
  +ownerAddress: OwnerAddress,
  +isLoading: boolean,
  +isFiltered: boolean,
|}

function getComment(comments: Comments, id: TransactionId, hash: Hash): ?string {
  /**
   * comment by transaction id has greater priority than comment by transaction hash
   * this is actual only for contract events
   */
  if (comments[id] != null) {
    return comments[id]
  }

  return comments[hash]
}

type ComponentState = {
  +activeItems: TransactionId[],
}

function getAddressName(
  favorites: AddressNames,
  addressNames: AddressNames,
  address: ?Address,
): ?string {
  if (!address) {
    return null
  }

  return addressNames[address] || favorites[address]
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
      editComment,
      removeFavorite,
      items,
      comments,
      favorites,
      addressNames,
      digitalAssets,
      assetAddress,
      ownerAddress,
      blockExplorerSubdomain,
      isLoading,
      isFiltered,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className='transactions-list -empty'>
          <TransactionsListEmpty isFiltered={isFiltered} />
        </div>
      )
    }

    const { activeItems }: ComponentState = this.state

    return (
      <div className='transactions-list'>
        {items.map((item: TransactionWithPrimaryKeys) => {
          const {
            keys,
            to,
            from,
            hash,
            contractAddress,
          }: TransactionWithPrimaryKeys = item

          const isContractCreation: boolean = !!contractAddress
          const isSent: boolean = !!from && (ownerAddress.toLowerCase() === from.toLowerCase())
          const txAddress: ?Address = isSent ? (to || contractAddress) : from

          return (
            <TransactionItem
              key={keys.id}
              editComment={editComment}
              removeFavorite={removeFavorite}
              setActive={this.setActive(keys.id)}
              data={item}
              asset={digitalAssets[keys.assetAddress]}
              txAddress={txAddress}
              comment={getComment(comments, keys.id, hash)}
              blockExplorerSubdomain={blockExplorerSubdomain}
              toName={getAddressName(favorites, addressNames, to)}
              fromName={getAddressName(favorites, addressNames, from)}
              isAssetList={!!assetAddress}
              isSent={isSent || isContractCreation}
              isActive={activeItems.includes(keys.id)}
              isFromFavorites={!!(txAddress && favorites[txAddress])}
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
