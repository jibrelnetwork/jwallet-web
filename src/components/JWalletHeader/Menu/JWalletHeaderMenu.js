import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JWalletHeaderMenu({ openSendFundsModal, openReceiveFundsModal }) {
  return (
    <div className='header-menu pull-left'>
      <div className='header-menu__item' onClick={openSendFundsModal}>
        <JIcon name='send' className='header-menu__icon' />
        <span className='header-menu__title'>{i18n('header.sendTitle')}</span>
      </div>
      <div className='header-menu__item' onClick={openReceiveFundsModal}>
        <JIcon name='receive' className='header-menu__icon' />
        <span className='header-menu__title'>{i18n('header.receiveTitle')}</span>
      </div>
    </div>
  )
}

JWalletHeaderMenu.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
}

export default JWalletHeaderMenu
