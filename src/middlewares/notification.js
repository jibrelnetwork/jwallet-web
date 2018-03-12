// @flow
// Show notifications

import React from 'react'
import { toast } from 'react-toastify'

import JToast, { options } from 'components/base/__new__/JToast'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'

const showToast = (
  type: 'info' | 'error',
  icon: string,
  message: string,
) => toast(
  <JToast
    type={type}
    icon={icon}
    message={message}
  />,
  options
)

export const show = () => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case editWallet.EDIT_SUCCESS: {
      showToast('info', 'some_icon', 'some_text')
      break
    }

    default: break
  }

  return next(action)
}
