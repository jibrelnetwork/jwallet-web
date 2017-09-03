import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function AccountManagerFooter({ addCustomToken }) {
  return (
    <div className='account-manager-footer' onClick={addCustomToken}>
      <JbIcon name='small-add' className='account-manager-footer__icon' small />{'Add custom token'}
    </div>
  )
}

AccountManagerFooter.propTypes = {
  addCustomToken: PropTypes.func.isRequired,
}

export default AccountManagerFooter
