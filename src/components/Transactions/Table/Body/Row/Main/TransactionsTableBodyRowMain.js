import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function TransactionsTableBodyRowMain(props) {
  const {
    setCurrentCurrency,
    toggleActive,
    type,
    status,
    address,
    amount,
    date,
    currencyIndex,
    isActive,
  } = props

  const isToken = (currencyIndex !== -1)

  return (
    <div className='table-row row clear' onClick={toggleActive}>
      <div className='table-body-item col col--2-4'>
        <JIcon
          name={`small-${(status === 'Rejected') ? 'convert' : type}`}
          className='transaction__type'
          small
        />
        <span className='transaction__amount'>{amount}</span>
      </div>
      <div className='table-body-item col col--2-4'>{date}</div>
      <div
        className={`table-body-item ${isToken ? 'transaction__token' : ''} col col--4-8`}
        onClick={isToken ? setCurrentCurrency(currencyIndex) : null}
      >
        {`${address.slice(0, 30)}...`}
      </div>
      <div className='table-body-item col col--2-4'>
        <span className={`transaction__status transaction__status--${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <JIcon
        name={'small-arrow'}
        className={`transaction__icon ${isActive ? 'transaction__icon--active' : ''}`}
        small
      />
    </div>
  )
}

TransactionsTableBodyRowMain.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionsTableBodyRowMain
