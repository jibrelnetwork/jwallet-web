import React from 'react'
import PropTypes from 'prop-types'

import { JDropdown, JIcon } from 'components/base'

import TransactionManagerPopover from './TransactionManagerPopover'

function TransactionManager(props) {
  const title = <JIcon name='dots' className='transaction-manager__icon' />

  return (
    <JDropdown
      className='transaction-manager'
      parentClassName='transactions-header__transaction-manager'
      title={title}
    >
      <TransactionManagerPopover {...props} />
    </JDropdown>
  )
}

TransactionManager.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default TransactionManager
