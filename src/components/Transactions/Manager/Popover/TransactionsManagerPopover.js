import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function TransactionsManagerPopover(props) {
  const { onClickOutside, sendFunds, receiveFunds, convertFunds, filter, remove } = props

  const body = (
    <div className='transactions-manager-popover'>
      <div className='popover__item' onClick={sendFunds}>{'Send funds'}</div>
      <div className='popover__item' onClick={receiveFunds}>{'Receive funds'}</div>
      <div className='popover__item' onClick={convertFunds}>{'Convert funds'}</div>
      <div className='popover__item' onClick={filter(true)}>{'Filter'}</div>
      <div className='popover__item popover__item--gray' onClick={remove}>{'Remove'}</div>
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
  convertFunds: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func,
}

TransactionsManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default TransactionsManagerPopover
