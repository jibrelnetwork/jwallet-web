// @flow

import React from 'react'

import { JButton } from 'components/base'
import { JText } from 'components/base/__new__'

const RemoveWallet = ({ remove }: Props) => (
  <div className='remove-wallet-view'>
    <div className='remove-wallet-info'>
      <JText value='routes.removeWallet.info.title' />
      <div className='remove-wallet-info__text'>
        <JText value='routes.removeWallet.info.text[0]' />
        <JText value='routes.removeWallet.info.text[1]' />
      </div>
    </div>
    <JButton onClick={remove} label={i18n('routes.removeWallet.buttonTitle')} blue />
  </div>
)

type Props = {
  remove: () => Dispatch,
}

export default RemoveWallet
