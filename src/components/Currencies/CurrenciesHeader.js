import React from 'react'
import PropTypes from 'prop-types'

import CurrenciesManager from 'components/CurrenciesManager'

function CurrenciesHeader({ openCurrenciesModal, isLoading }) {
  if (isLoading) {
    return (
      <div className='currencies-header clear'>
        <div className='currencies-header__title loading loading--currencies-title pull-left' />
        <div className='currencies-header__icon loading loading--currencies-icon pull-right' />
      </div>
    )
  }

  return (
    <div className='currencies-header clear'>
      <div className='currencies-header__title pull-left'>{'Currencies'}</div>
      <CurrenciesManager
        iconName='currencies'
        className='currencies-header__icon pull-right'
        onClick={openCurrenciesModal}
      />
    </div>
  )
}

CurrenciesHeader.propTypes = {
  openCurrenciesModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default CurrenciesHeader
