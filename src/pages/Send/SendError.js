// @flow

import React from 'react'
import { t } from 'ttag'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

type Props = {|
  onGoBackClick: () => any,
  onCancelClick: () => any,
|}

export function SendError({
  onGoBackClick,
  onCancelClick,
}: Props) {
  return (
    <div className='__validation-failed'>
      <UserActionInfo
        title={t`Internet Connection Error`}
        // eslint-disable-next-line max-len
        text={t`Transfer can't be processed without internet connection. Please, try again later.`}
        iconName='ic_fail_48-use-fill'
      />
      <ButtonWithConfirm
        onCancel={onGoBackClick}
        onConfirm={onCancelClick}
        labelCancel={t`Go Back and Try Again`}
        labelConfirm={t`Cancel Transfer`}
      />
    </div>
  )
}
