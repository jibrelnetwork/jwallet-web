import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import CurrenciesTable from 'components/CurrenciesTable'

class CurrenciesModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'currencies' }
  }

  renderHeader = () => {
    return <div className='currencies-modal-header' />
  }

  renderBody = () => {
    const {
      searchCurrencies,
      items,
      foundItemsSymbols,
      balances,
      sortField,
      sortDirection,
      searchQuery,
      isActiveAll,
    } = this.props

    return (
      <CurrenciesTable
        toggleActiveCurrency={this.toggleActiveCurrency}
        searchCurrencies={searchCurrencies}
        sortCurrencies={this.sortCurrencies}
        items={items}
        foundItemsSymbols={foundItemsSymbols}
        balances={balances}
        sortField={sortField}
        sortDirection={sortDirection}
        searchQuery={searchQuery}
        isActiveAll={isActiveAll}
      />
    )
  }

  renderFooter = () => {
    return (
      <div className='currencies-modal-footer' onClick={this.openCustomTokenModal}>
        <JIcon name='small-add' className='currencies-modal-footer__icon' small />
        {'Add custom token'}
      </div>
    )
  }

  closeModal = () => this.props.closeCurrenciesModal()

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

  sortCurrencies = field => () => this.props.sortCurrencies(field)

  openCustomTokenModal = () => {
    const { openCurrenciesModal, closeCurrenciesModal, openCustomTokenModal } = this.props

    openCustomTokenModal(openCurrenciesModal)
    closeCurrenciesModal()
  }
}

CurrenciesModal.propTypes = {
  openCurrenciesModal: PropTypes.func.isRequired,
  closeCurrenciesModal: PropTypes.func.isRequired,
  toggleActiveCurrency: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  openCustomTokenModal: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
    isLicensed: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
  })).isRequired,
  foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isActiveAll: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  balances: PropTypes.shape({}),
}

CurrenciesModal.defaultProps = {
  onClose: null,
  balances: {},
}

export default CurrenciesModal
