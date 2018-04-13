// @flow
// Show notifications

// import React from 'react'
// import { toast } from 'react-toastify'

// import JToast, { options } from 'components/base/JToast'
import * as editWallet from 'routes/Wallets/routes/Edit/modules/editWallet'

/*
const showToast = (
  color: 'white' | 'red' | 'blue' | 'gray',
  icon: string,
  title: string,
  description: string,
) => toast(
  <JToast
    icon={icon}
    color={color}
    title={title}
    description={description}
  />,
  options
)
*/

export const show = () => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case editWallet.EDIT_SUCCESS: {
      // showToast('blue', 'some_icon', 'some_title', 'some_description')
      break
    }

    default: break
  }

  return next(action)
}
