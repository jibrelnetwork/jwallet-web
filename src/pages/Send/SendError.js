// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

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
  const i18n = useI18n()

  /* eslint-disable max-len */
  return (
    <div className='__send-error'>
      <UserActionInfo
        title={i18n._(
          'Send.SendError.error.noConnection',
          null,
          { defaults: 'Internet Connection Error' },
        )}
        text={i18n._(
          'Send.SendError.error.noConnection.description',
          null,
          { defaults: 'Transfer can\'t be processed without internet connection. Please, try again later.' },
        )}
        iconName='ic_fail_48-use-fill'
      />
      <ButtonWithConfirm
        onCancel={onGoBackClick}
        onConfirm={onCancelClick}
        labelCancel={i18n._('Send.SendError.actions.back', null, { defaults: 'Go Back and Try Again' })}
        labelConfirm={i18n._('Send.SendError.actions.cancel', null, { defaults: 'Cancel Transfer' })}
      />
    </div>
  )
  /* eslint-enable max-len */
}
