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
        <CurrenciesBody setCurrentCurrency={this.setCurrentCurrency} currencies={currencies} />
      </div>
    )
  }

  setCurrentCurrency = current => () => {
    const { setCurrentCurrency, isTransactionsLoading, currencies } = this.props
    const isAlreadyCurrent = (current === currencies.currentActiveIndex)

    if (isTransactionsLoading || isAlreadyCurrent) {
      return
    }

    setCurrentCurrency(current)
  }

  openCurrenciesModal = () => this.props.openCurrenciesModal(/* without param */)
}

Currencies.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  setCurrentCurrency: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  isTransactionsLoading: PropTypes.bool.isRequired,
}

export default Currencies
