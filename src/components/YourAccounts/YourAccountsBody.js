import React from 'react'
import PropTypes from 'prop-types'

import AccountItem from 'components/AccountItem'

function YourAccountsBody({ setCurrentAccount, accounts }) {
  const { items, current } = accounts

  return (
    <div className='your-accounts-body'>
      {items.map((accountProps, i) => {
        const isCurrent = (i === current)

        return (
          <AccountItem
            key={i}
            isCurrent={isCurrent}
            setCurrentAccount={setCurrentAccount(i)}
            {...accountProps}
          />
        )
      })}
    </div>
  )
}

YourAccountsBody.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    current: PropTypes.number.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default YourAccountsBody
