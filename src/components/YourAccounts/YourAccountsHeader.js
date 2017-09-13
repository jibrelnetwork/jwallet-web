import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function YourAccountsHeader({ openAccountManager }) {
  return (
    <div className='your-accounts-header clear'>
      <div className='your-accounts-header__title pull-left'>{'Your Accounts'}</div>
      <JIcon
        name='settings'
        className='your-accounts-header__icon pull-right'
        title='Manage accounts'
        onClick={openAccountManager}
      />
    </div>
  )
}

YourAccountsHeader.propTypes = {
  openAccountManager: PropTypes.func.isRequired,
}

export default YourAccountsHeader
