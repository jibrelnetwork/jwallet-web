// @flow strict

import { t } from 'ttag'

import { type Props } from './TransactionDetailsInternal'

const TRANSACTION_DETAILS_STATUSES = {
  transaction_in_success: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-in-use-fill',
  },
  transaction_out_success: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-out-use-fill',
  },
  transaction_normal_fail: {
    statusDescription: t`Transfer declined.`,
    iconName: 'trx-error-declined-use-fill',
  },
  transaction_normal_stuck: {
    statusDescription: t`Transfer stuck.`,
    iconName: 'trx-error-stuck-use-fill',
  },
  transaction_normal_pending: {
    statusDescription: t`Transfer is being processed. This may take some time.`,
    iconName: 'trx-pending-use-fill',
  },
  transaction_cancel_success: {
    statusDescription: t`Transfer canceled.`,
    iconName: 'trx-success-use-fill',
  },
  transaction_cancel_fail: {
    statusDescription: t`Transfer not canceled.`,
    iconName: 'trx-error-declined-use-fill',
  },
  transaction_cancel_stuck: {
    statusDescription: t`Cancel transfer stuck.`,
    iconName: 'trx-error-stuck-use-fill',
  },
  transaction_cancel_pending: {
    statusDescription: t`Cancel transfer. This may take some time.`,
    iconName: 'trx-pending-use-fill',
  },
}

// TODO: This implementation does not take into account contract calls, yet
const getStatus = (props: Props) =>
  props.type === 'cancel'
    ? props.type
    : props.status === 'success'
      ? props.type
      : 'normal'

export function getTransactionDetailsConfig(props: Props): Props {
  return {
    ...props,
    ...TRANSACTION_DETAILS_STATUSES[`transaction_${getStatus(props)}_${props.status}`],
  }
}
