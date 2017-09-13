import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function HeaderMenu({ openSendFundsModal, openReceiveFundsModal, openConvertFundsModal }) {
  return (
    <div className='header-menu pull-left'>
      <div className='header-menu__item' onClick={openSendFundsModal}>
        <JbIcon name='send' className='header-menu__icon' />
        <span className='header-menu__title'>{'Send'}</span>
      </div>
      <div className='header-menu__item' onClick={openReceiveFundsModal}>
        <JbIcon name='receive' className='header-menu__icon' />
        <span className='header-menu__title'>{'Receive'}</span>
      </div>
      <div className='header-menu__item' onClick={openConvertFundsModal}>
        <JbIcon name='convert' className='header-menu__icon' />
        <span className='header-menu__title'>{'Convert'}</span>
      </div>
    </div>
  )
}

HeaderMenu.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
}

export default HeaderMenu
