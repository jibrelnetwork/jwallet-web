import React from 'react'
import PropTypes from 'prop-types'

import { JDropdown, JIcon } from 'components/base'

import AccountManagerPopover from './Popover'

function AccountManager(props) {
  const title = <JIcon name='dots' className='icon--dots-manager' />

  return (
    <JDropdown className='account-manager' title={title}>
      <AccountManagerPopover {...props} />
    </JDropdown>
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
