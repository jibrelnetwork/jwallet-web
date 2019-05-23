// @flow strict

import { t } from 'ttag'

import { type Props } from './TransactionDetailsInternal'

const TRANSACTION_DETAILS_STATUSES = {
  transaction_success: {
    statusDescription: t`Transfer processed.`,
  },
  transaction_fail: {
    statusDescription: t`Transfer declined.`,
  },
  transaction_stuck: {
    statusDescription: t`Transfer stuck.`,
  },
  transaction_pending: {
    statusDescription: t`Transfer is being processed. This may take some time.`,
  },
}

export function getTransactionDetailsConfig(props: Props): Props {
  return {
    ...props,
    ...TRANSACTION_DETAILS_STATUSES[`transaction_${props.status}`],
  }
}
