import React from 'react'
import PropTypes from 'prop-types'

function JWallet() {
  return (
    <div className='jwallet'>
      {'JWallet view'}
    </div>
  )
}

JWallet.propTypes = {
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
}

export default JWallet
