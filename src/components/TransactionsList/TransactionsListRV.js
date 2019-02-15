// @flow

import React, { Component } from 'react'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'

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
  +blockExplorerUISubdomain: string,
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

    this.cellMeasurerCache = new CellMeasurerCache({
      defaultHeight: 92,
      fixedWidth: true,
    })
  }

  setActive = (id: TransactionId) => () => {
    const { activeItems }: ComponentState = this.state
    const isFound: boolean = activeItems.includes(id)

    const start = +new Date()
    const gridIndex = this.props.items.findIndex(({ keys }) => keys.id === id)

    const renderRaf = () => {
      const progress = +new Date() - start

      this.cellMeasurerCache.clear(gridIndex, 0)
      this.theGrid.forceUpdateGrid()

      if (progress < 350) {
        window.requestAnimationFrame(renderRaf)
      }
    }

    this.setState({
      activeItems: !isFound
        ? activeItems.concat(id)
        : activeItems.filter((item: TransactionId): boolean => (item !== id)),
    }, () => {
      window.requestAnimationFrame(renderRaf)
    })

    console.log('setActive')
  }

  rowRenderer = ({ index, key, style, parent }) => {
    // console.log('rowRenderer')

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
      blockExplorerUISubdomain,
    }: Props = this.props

    const {
      keys,
      to,
      from,
      hash,
      contractAddress,
    }: TransactionWithPrimaryKeys = items[index]

    const isContractCreation: boolean = !!contractAddress
    const isSent: boolean = !!from && (ownerAddress.toLowerCase() === from.toLowerCase())
    const txAddress: ?Address = isSent ? (to || contractAddress) : from

    // console.log(this.state.activeItems, keys)

    return (
      <CellMeasurer
        parent={parent}
        rowIndex={index}
        columnIndex={0}
        key={key}
        cache={this.cellMeasurerCache}
      >
        <div style={style}>
          <TransactionItem
            key={keys.id}
            editComment={editComment}
            removeFavorite={removeFavorite}
            setActive={this.setActive(keys.id)}
            data={items[index]}
            asset={digitalAssets[keys.assetAddress]}
            txAddress={txAddress}
            comment={getComment(comments, keys.id, hash)}
            blockExplorerUISubdomain={blockExplorerUISubdomain}
            toName={getAddressName(favorites, addressNames, to)}
            fromName={getAddressName(favorites, addressNames, from)}
            isAssetList={!!assetAddress}
            isSent={isSent || isContractCreation}
            isActive={this.state.activeItems.includes(keys.id)}
            isFromFavorites={!!(txAddress && favorites[txAddress])}
          />
        </div>
      </CellMeasurer>
    )
  }

  render() {
    console.log('render')

    const {
      items,
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

    return (
      <div className='transactions-list'>
        <AutoSizer>
          {({ height, width }) => (
            <List
            // eslint-disable-next-line no-return-assign
              ref={ref => this.theGrid = ref}
              height={height}
              width={width}
              rowCount={items.length}
              rowRenderer={this.rowRenderer}
              overscanRowCount={10}
              deferredMeasurementCache={this.cellMeasurerCache}
              rowHeight={this.cellMeasurerCache.rowHeight}
            />
          )}
        </AutoSizer>
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
