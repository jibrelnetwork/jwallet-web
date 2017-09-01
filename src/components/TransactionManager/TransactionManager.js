import React from 'react'
import PropTypes from 'prop-types'

import JbDropdown from 'components/base/JbDropdown'
import JbIcon from 'components/base/JbIcon'

import TransactionManagerPopover from './TransactionManagerPopover'

function TransactionManager(props) {
  const title = <JbIcon name='dots' className='transaction-manager__icon' />

  return (
    <JbDropdown
      className='transaction-manager'
      parentClassName='transactions-header__transaction-manager'
      title={title}
    >
      <TransactionManagerPopover {...props} />
    </JbDropdown>
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
