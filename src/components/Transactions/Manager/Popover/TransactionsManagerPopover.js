import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

function TransactionsManagerPopover({ onClickOutside, sendFunds, receiveFunds, filter, remove }) {
  const body = (
    <div className='transactions-manager-popover'>
      <div className='popover__item' onClick={sendFunds}>
        <JIcon name='small-send' className='popover__icon' small />
        <span className='popover__label'>{'Send funds'}</span>
      </div>
      <div className='popover__item' onClick={receiveFunds}>
        <JIcon name='small-receive' className='popover__icon' small />
        <span className='popover__label'>{'Receive funds'}</span>
      </div>
      <div className='popover__item' onClick={filter(true)}>
        <JIcon name='date' className='popover__icon' small />
        <span className='popover__label'>{'Filter'}</span>
      </div>
      <div className='popover__item popover__item--gray' onClick={remove}>
        <JIcon name='small-clear' className='popover__icon' small />
        <span className='popover__label'>{'Remove'}</span>
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
