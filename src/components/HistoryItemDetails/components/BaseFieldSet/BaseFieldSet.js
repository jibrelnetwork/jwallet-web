// @flow strict

import React from 'react'

import { FeeField } from '../FeeField/FeeField'
import { AmountField } from '../AmountField/AmountField'
import { type CardProps } from '../../HistoryItemDetails'
import { AddressField } from '../AddressField/AddressField'
import { AssetItemPreview } from '../AssetItemPreview/AssetItemPreview'
import { TransactionHashField } from '../TransactionHashField/TransactionHashField'

export function BaseFieldSet({
  to,
  fee,
  from,
  hash,
  amount,
  toName,
  fromName,
  amountStr,
  assetName,
  assetSymbol,
  assetAddress,
  blockExplorerUISubdomain,
  isCancel,
  isPending,
}: CardProps) {
  return (
    <>
      {!isCancel && (
        <AssetItemPreview
          name={assetName}
          symbol={assetSymbol}
          address={assetAddress}
        />
      )}
      {amount && !isCancel && <AmountField value={amountStr} />}
      {from && (
        <AddressField
          value={from}
          name={fromName}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
          type='sender'
        />
      )}
      {to && (
        <AddressField
          value={to}
          name={toName}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
          type='recipient'
        />
      )}
      <TransactionHashField
        value={hash}
        blockExplorerUISubdomain={blockExplorerUISubdomain}
      />
      <FeeField
        value={fee}
        isPending={isPending}
      />
    </>
  )
}
