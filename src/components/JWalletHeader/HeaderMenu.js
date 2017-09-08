import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function HeaderMenu({ sendFunds, receiveFunds, convertFunds }) {
  return (
    <div className='header-menu pull-left'>
      <div className='header-menu__item' onClick={sendFunds}>
        <JbIcon name='send' className='header-menu__icon' />
        <span className='header-menu__title'>{'Send'}</span>
      </div>
      <div className='header-menu__item' onClick={receiveFunds}>
        <JbIcon name='receive' className='header-menu__icon' />
        <span className='header-menu__title'>{'Receive'}</span>
      </div>
      <div className='header-menu__item' onClick={convertFunds}>
        <JbIcon name='convert' className='header-menu__icon' />
        <span className='header-menu__title'>{'Convert'}</span>
      </div>
    </div>
  )
}

HeaderMenu.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
}

export default HeaderMenu
