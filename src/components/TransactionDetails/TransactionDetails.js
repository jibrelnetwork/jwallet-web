// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { memoize } from 'lodash-es'

import { transactionsIndex } from 'components/TransactionItemNew/transactionsIndex'

type ContainerProps = {
  txHash: TransactionId,
}

type Props = {

}

const memoizedIndex = memoize(transactionsIndex)

function TransactionDetailsInternal(props: Props) {
  return (
    <div>
      <pre style={{ width: '100%' }}>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>
  )
}

function mapStateToProps(state: AppState, { txHash }: ContainerProps) {
  return { ...memoizedIndex(state)[txHash] }
}

export const TransactionDetails = (
  connect(mapStateToProps)(React.memo/* :: <Props> */(TransactionDetailsInternal))
)
