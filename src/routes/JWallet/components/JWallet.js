import React from 'react'

import { Currencies, Transactions } from 'components'

function JWallet() {
  return (
    <div className='jwallet'>
      <Currencies />
      <Transactions />
    </div>
  )
}

export default JWallet
