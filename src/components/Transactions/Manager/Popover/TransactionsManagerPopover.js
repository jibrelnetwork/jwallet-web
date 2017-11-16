import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import { JIcon, JPopover } from 'components/base'

const { transactionManagerAction } = i18n.transactions

function TransactionsManagerPopover({ onClickOutside, sendFunds, receiveFunds, filter, remove }) {
  const body = (
    <div className='transactions-manager-popover'>
      <div className='popover__item' onClick={sendFunds}>
        <JIcon name='small-send' className='popover__icon' small />
        <span className='popover__label'>{transactionManagerAction.sendFunds}</span>
      </div>
      <div className='popover__item' onClick={receiveFunds}>
        <JIcon name='small-receive' className='popover__icon' small />
        <span className='popover__label'>{transactionManagerAction.receiveFunds}</span>
      </div>
      <div className='popover__item' onClick={filter(true)}>
        <JIcon name='date' className='popover__icon' small />
        <span className='popover__label'>{transactionManagerAction.filter}</span>
      </div>
      <div className='popover__item popover__item--gray' onClick={remove}>
        <JIcon name='small-clear' className='popover__icon' small />
        <span className='popover__label'>{transactionManagerAction.remove}</span>
      </div>
    </div>
  )

  return (
    <JPopover
      name='transactions-manager'
      onClickOutside={onClickOutside}
      body={body}
      isCloseOnClickInside
    />
  )
}

TransactionsManagerPopover.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func,
}

TransactionsManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default TransactionsManagerPopover
