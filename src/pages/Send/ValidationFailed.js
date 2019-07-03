// @flow

import React from 'react'
import { t } from 'ttag'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

type Props = {|
  onGoBackClick: () => any,
  onGoNextClick: () => any,
|}

export function ValidationFailed({
  onGoBackClick,
  onGoNextClick,
}: Props) {
  return (
    <div className='__validation-failed'>
      <UserActionInfo
        title={t`Validation failed`}
        // eslint-disable-next-line max-len
        text={t`Transfer validation failed. Chances are that if you proceed, transfer won't be wired,
        but the blockchain fee will be charged. Are you sure you want to proceed?`}
        iconName='ic_fail_48-use-fill'
      />
      <ButtonWithConfirm
        onCancel={onGoBackClick}
        onConfirm={onGoNextClick}
        labelCancel={t`Change Transfer Details`}
        labelConfirm={t`Proceed Anyway`}
        isReversed
      />
    </div>
  )
}
