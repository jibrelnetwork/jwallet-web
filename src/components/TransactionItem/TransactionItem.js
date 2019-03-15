// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +removeFavorite: (Address) => void,
  +editComment: (CommentId, string) => void,
  +data: TransactionWithPrimaryKeys,
  +asset: ?DigitalAsset,
  +toName: ?string,
  +comment: ?string,
  +fromName: ?string,
  +txAddress: ?Address,
  +blockExplorerUISubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
  +isFromFavorites: boolean,
|}

function TransactionItem({
  setActive,
  editComment,
  removeFavorite,
  data,
  asset,
  toName,
  comment,
  fromName,
  txAddress,
  blockExplorerUISubdomain,
  isSent,
  isActive,
  isAssetList,
  isFromFavorites,
}: Props) {
  if (!asset) {
    return null
  }

  const isMintable = data.eventType === 2
  const isEventMint = isMintable && !data.from
  const isEventBurn = isMintable && !data.to

  return (
    <div className='transaction-item'>
      <JCard color='white' isBorderRadius isHover>
        <TransactionItemMain
          setActive={setActive}
          data={data}
          asset={asset}
          comment={comment}
          txAddress={txAddress}
          txAddressName={isSent ? toName : fromName}
          isSent={isSent}
          isActive={isActive}
          isAssetList={isAssetList}
          isEventMint={isEventMint}
          isEventBurn={isEventBurn}
        />
        <TransactionItemDetails
          editComment={editComment}
          removeFavorite={removeFavorite}
          data={data}
          asset={asset}
          toName={toName}
          comment={comment}
          fromName={fromName}
          txAddress={txAddress}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
          isSent={isSent}
          isActive={isActive}
          isFromFavorites={isFromFavorites}
          isMintable={isMintable}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
