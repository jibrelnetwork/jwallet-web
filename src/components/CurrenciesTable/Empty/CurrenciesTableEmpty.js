import React from 'react'

function CurrenciesTableEmpty() {
  return (
    <div className='table-body table-body--curencies-empty'>
      <div className='currencies-empty' style={{ backgroundImage: 'url("/img/no-data.svg")' }}>
        <div className='currencies-empty__message'>
          {'Look like there isn\'t any tokens in your account'}
        </div>
      </div>
    </div>
  )
}

export default CurrenciesTableEmpty
