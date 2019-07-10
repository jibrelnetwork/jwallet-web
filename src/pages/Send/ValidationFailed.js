// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

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
        title={i18n._(
          'Send.ValidationFailed.title',
          null,
          { defaults: 'Validation failed' },
        )}
        // eslint-disable-next-line max-len
        text={i18n._('Send.ValidationFailed.description', null, { defaults: 'Transfer validation failed. Chances are that if you proceed, transfer won\'t be wired, \nbut the blockchain fee will be charged. Are you sure you want to proceed?' })}
        iconName='ic_fail_48-use-fill'
      />
      <ButtonWithConfirm
        onCancel={onGoBackClick}
        onConfirm={onGoNextClick}
        labelCancel={i18n._(
          'Send.ValidationFailed.actions.cancel',
          null,
          { defaults: 'Change Transfer Details' },
        )}
        labelConfirm={i18n._(
          'Send.ValidationFailed.actions.submit',
          null,
          { defaults: 'Proceed Anyway' },
        )}
        isReversed
      />
    </div>
  )
}
