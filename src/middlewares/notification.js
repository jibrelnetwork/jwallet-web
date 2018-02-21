// @flow
// Show notifications

import React from 'react'
import { toast } from 'react-toastify'

import JToast, { options } from '../components/base/JToast'

const showToast = (
  type: 'info' | 'error',
  icon: string,
  message: string
) => toast(
  <JToast
    type={type}
    icon={icon}
    message={message}
  />,
  options
)

export const show = () => (next: any) => (action: any) => {
  if (action.type === 'SOME_ACTION') {
    showToast('info', 'some_icon', 'some_text')
  }
  return next(action)
}
