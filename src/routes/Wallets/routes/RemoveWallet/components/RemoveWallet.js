import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JText } from 'components/base'

const RemoveWallet = ({ remove }) => (
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

RemoveWallet.propTypes = {
  remove: PropTypes.func.isRequired,
}

export default RemoveWallet
