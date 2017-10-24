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
  removeAccount: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired,
  setDerivationPath: PropTypes.func.isRequired,
  isMnemonicType: PropTypes.bool.isRequired,
}

export default AccountManager
