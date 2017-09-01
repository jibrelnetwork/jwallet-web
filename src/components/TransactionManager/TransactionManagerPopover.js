import React from 'react'
import PropTypes from 'prop-types'

import JbPopover from 'components/base/JbPopover'

function TransactionManagerPopover(props) {
  const { onClickOutside, sendFunds, receiveFunds, convertFunds, filter, remove } = props

  const body = (
    <div className='transaction-manager__popover'>
      <div className='popover__item' onClick={sendFunds}>{'Send funds'}</div>
      <div className='popover__item' onClick={receiveFunds}>{'Receive funds'}</div>
      <div className='popover__item' onClick={convertFunds}>{'Convert funds'}</div>
      <div className='popover__item' onClick={filter}>{'Filter'}</div>
      <div className='popover__item popover__item--gray' onClick={remove}>{'Remove'}</div>
    </div>
  )

  return <JbPopover name='transaction-manager' onClickOutside={onClickOutside} body={body} />
}

TransactionManagerPopover.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default TransactionManagerPopover
