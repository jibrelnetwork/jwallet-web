import React from 'react'
import PropTypes from 'prop-types'

import { JDropdown, JIcon } from 'components/base'

import TransactionsManagerPopover from './Popover'

function TransactionsManager(props) {
  const title = <div className='icon--dots-wrapper'><JIcon name='dots' /></div>

  return (
    <JDropdown
      className='transactions-manager'
      parentClassName='transactions-header__transactions-manager'
      title={title}
    >
      <TransactionsManagerPopover {...props} />
    </JDropdown>
  )
}

TransactionsManager.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default TransactionsManager
