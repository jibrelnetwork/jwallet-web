import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function HeaderMenu({ openSendFundsModal, openReceiveFundsModal }) {
  return (
    <div className='header-menu pull-left'>
      <div className='header-menu__item' onClick={openSendFundsModal}>
        <JIcon name='send' className='header-menu__icon' />
        <span className='header-menu__title'>{'Send'}</span>
      </div>
      <div className='header-menu__item' onClick={openReceiveFundsModal}>
        <JIcon name='receive' className='header-menu__icon' />
        <span className='header-menu__title'>{'Receive'}</span>
      </div>
    </div>
  )
}

HeaderMenu.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
}

export default HeaderMenu
