import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'

function TransactionsTableBodyRowMain({
  setCurrentDigitalAssetAddress,
  toggleActive,
  type,
  status,
  address,
  contractAddress,
  amount,
  date,
  isActive,
  isToken,
  isJNT,
}) {
  return (
    <div className='table-row row clear' onClick={toggleActive}>
      <div className='table-body-item col col--2-4'>
        <JIcon
          name={`small-${type}`}
          className={classNames('transaction__type', {
            jnt: isJNT,
            rejected: (status === i18n('transactions.table.statusValue.rejected')),
          })}
          small
        />
        <span className='transaction__amount'>{amount}</span>
      </div>
      <div className='table-body-item col col--2-4'>{date}</div>
      <div
        className={classNames('table-body-item', { transaction__token: isToken }, 'col col--4-8')}
        onClick={isToken ? setCurrentDigitalAssetAddress(contractAddress) : null}
      >
        {address ? `${address.slice(0, 30)}...` : '–'}
      </div>
      <div className='table-body-item col col--2-4'>
        <span className={`transaction__status transaction__status--${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <JIcon
        name='small-arrow'
        className={classNames('transaction__icon', { 'transaction__icon--active': isActive })}
        small
      />
    </div>
  )
}

TransactionsTableBodyRowMain.propTypes = {
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isToken: PropTypes.bool.isRequired,
  /* optional */
  address: PropTypes.string,
  isJNT: PropTypes.bool,
}

TransactionsTableBodyRowMain.defaultProps = {
  address: null,
  isJNT: false,
}

export default TransactionsTableBodyRowMain
