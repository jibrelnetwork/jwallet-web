import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'

function HeaderMenu({ openSendFundsModal, openReceiveFundsModal, accountType }) {
  const disabled = ['address', 'bip32Xpub'].includes(accountType)

  return (
    <div className='header-menu pull-left'>
      <div
        onClick={disabled ? null : openSendFundsModal}
        className={classNames('header-menu__item', { 'header-menu__item--disabled': disabled })}
      >
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

HeaderMenu.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
}

export default HeaderMenu
