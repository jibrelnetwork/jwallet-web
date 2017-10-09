import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import CurrenciesTable from 'components/CurrenciesTable'

class CurrenciesModal extends Component {
  render() {
    const { closeCurrenciesModal, currencies } = this.props

    return (
      <JModal
        closeModal={closeCurrenciesModal}
        name='currencies-modal'
        header={this.renderCurrencyManagerHeader()}
        body={this.renderCurrencyManagerBody()}
        footer={this.renderCurrencyManagerFooter()}
        isOpen={currencies.isCurrenciesModalOpen}
      />
    )
  }

  renderCurrencyManagerHeader = () => {
    return <div className='currencies-modal-header' />
  }

  renderCurrencyManagerBody = () => {
    const { searchCurrencies, currencies } = this.props

    return (
      <div className='currencies-modal-body'>
        <CurrenciesTable
          toggleActiveCurrency={this.toggleActiveCurrency}
          searchCurrencies={searchCurrencies}
          sortCurrencies={this.sortCurrencies}
          currencies={currencies}
        />
      </div>
    )
  }

  renderCurrencyManagerFooter = () => {
    return (
      <div className='currencies-modal-footer' onClick={this.addCustomToken}>
        <JIcon name='small-add' className='currencies-modal-footer__icon' small />
        {'Add custom token'}
      </div>
    )
  }

  toggleActiveCurrency = (index) => {
    return (/* new checkbox state here */) => (e) => {
      this.props.toggleActiveCurrency(index)

      /**
       * clicking on checkbox call this function twice,
       * because currency row has the same onClick handler as well
       */
      e.stopPropagation()
    }
  }

  sortCurrencies = field => (/* event */) => this.props.sortCurrencies(field)

  addCustomToken = (/* event */) => {
    const { openCustomTokenModal, closeCurrenciesModal } = this.props

    openCustomTokenModal()
    closeCurrenciesModal()
  }
}

CurrenciesModal.propTypes = {
  closeCurrenciesModal: PropTypes.func.isRequired,
  toggleActiveCurrency: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  openCustomTokenModal: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      licensed: PropTypes.string.isRequired,
      transfer: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isCurrenciesModalOpen: PropTypes.bool.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default CurrenciesModal
