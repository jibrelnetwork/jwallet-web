// @flow strict

import React from 'react'
import { connect } from 'react-redux'

type ContainerProps = {
  txHash: TransactionId,
}

type Props = {

}

function TransactionDetailsInternal(props: Props) {
  return (
    <div>
      {props}
    </div>
  )
}

function mapStateToProps(state: AppState, { txHash }: ContainerProps) {
  return { txHash }
}

export const TransactionDetails = (
  connect(mapStateToProps)(React.memo/* :: <Props> */(TransactionDetailsInternal))
)
