import React from 'react'

import YourAccounts from 'components/YourAccounts'
import TransactionsTable from 'components/TransactionsTable'

function JWallet() {
  return (
    <div className='jwallet'>
      <YourAccounts />
      <TransactionsTable />
    </div>
  )
}

export default JWallet
