import React from 'react'

import Currencies from 'components/Currencies'
import TransactionsTable from 'components/TransactionsTable'

function JWallet() {
  return (
    <div className='jwallet'>
      <Currencies />
      <TransactionsTable />
    </div>
  )
}

export default JWallet
