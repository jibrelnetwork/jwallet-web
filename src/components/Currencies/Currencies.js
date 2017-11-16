import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CurrenciesHeader from './CurrenciesHeader'
import CurrenciesBody from './CurrenciesBody'

class Currencies extends Component {
  componentDidMount() {
    const { getCurrencies, currencies } = this.props

    if (!currencies.items.length) {
      getCurrencies()
    }
  }

  render() {
    const { currencies } = this.props
    const { isLoading } = currencies

    return (
      <div className='currencies'>
        <CurrenciesHeader openCurrenciesModal={this.openCurrenciesModal} isLoading={isLoading} />
        <CurrenciesBody setCurrentAddress={this.setCurrentAddress} currencies={currencies} />
      </div>
    )
  }

  setCurrentAddress = current => () => {
    const { setCurrentDigitalAssetAddress, isTransactionsLoading, currencies } = this.props
    const isAlreadyCurrent = (current === currencies.currentAddress)

    if (isTransactionsLoading || isAlreadyCurrent) {
      return
    }

    setCurrentDigitalAssetAddress(current)
  }

  openCurrenciesModal = () => this.props.openCurrenciesModal(/* without param */)
}

Currencies.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
    /* optional */
    balances: PropTypes.object,
    currentAddress: PropTypes.string,
  }).isRequired,
  isTransactionsLoading: PropTypes.bool.isRequired,
}

export default Currencies
