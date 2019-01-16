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
  +blockExplorerSubdomain: string,
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
  blockExplorerSubdomain,
  isSent,
  isActive,
  isAssetList,
  isFromFavorites,
}: Props) {
  if (!asset) {
    return null
  }

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
          blockExplorerSubdomain={blockExplorerSubdomain}
          isSent={isSent}
          isActive={isActive}
          isFromFavorites={isFromFavorites}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
