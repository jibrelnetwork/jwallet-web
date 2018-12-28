// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +editComment: (CommentId, string) => void,
  +data: TransactionWithPrimaryKeys,
  +asset: ?DigitalAsset,
  +toName: ?string,
  +comment: ?string,
  +fromName: ?string,
  +blockExplorerSubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
|}

function TransactionItem({
  setActive,
  editComment,
  data,
  asset,
  toName,
  comment,
  fromName,
  blockExplorerSubdomain,
  isSent,
  isActive,
  isAssetList,
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
          txAddressName={isSent ? toName : fromName}
          blockExplorerSubdomain={blockExplorerSubdomain}
          isSent={isSent}
          isActive={isActive}
          isAssetList={isAssetList}
        />
        <TransactionItemDetails
          editComment={editComment}
          data={data}
          asset={asset}
          comment={comment}
          toName={toName}
          fromName={fromName}
          blockExplorerSubdomain={blockExplorerSubdomain}
          isSent={isSent}
          isActive={isActive}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
