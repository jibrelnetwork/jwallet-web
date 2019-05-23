// @flow strict

import { t } from 'ttag'

import { type Props } from './TransactionDetailsInternal'

const TRANSACTION_DETAILS_STATUSES = {
  transaction_success: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-success-use-fill',
  },
  transaction_in: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-in-use-fill',
  },
  transaction_out: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-out-use-fill',
  },
  transaction_fail: {
    statusDescription: t`Transfer declined.`,
    iconName: 'trx-error-declined-use-fill',
  },
  transaction_stuck: {
    statusDescription: t`Transfer stuck.`,
    iconName: 'trx-error-stuck-use-fill',
  },
  transaction_pending: {
    statusDescription: t`Transfer is being processed. This may take some time.`,
    iconName: 'trx-pending-use-fill',
  },
}

// TODO: This implementation does not take into account contract calls, yet
const getStatus = props => props.status === 'success' ? props.type : props.status

export function getTransactionDetailsConfig(props: Props): Props {
  return {
    ...props,
    ...TRANSACTION_DETAILS_STATUSES[`transaction_${getStatus(props)}`],
  }
}
