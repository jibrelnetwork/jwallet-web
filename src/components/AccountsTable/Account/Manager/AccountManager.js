import React from 'react'
import PropTypes from 'prop-types'

import { JDropdown, JIcon } from 'components/base'

import AccountManagerPopover from './Popover'

function AccountManager(props) {
  const title = <div className='icon--dots-wrapper'><JIcon name='dots' /></div>

  return (
    <div className='account-manager-container table-body-item pull-right col col--2'>
      <JDropdown className='account-manager' title={title}>
        <AccountManagerPopover {...props} />
      </JDropdown>
    </div>
  )
}

AccountManager.propTypes = {
  setEditAccountName: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  openDerivationPathModal: PropTypes.func,
}

AccountManager.defaultProps = {
  openDerivationPathModal: null,
}

export default AccountManager
