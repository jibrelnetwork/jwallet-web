import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import CurrenciesTable from 'components/CurrenciesTable'

class CurrenciesModal extends JModal {
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
        toggleActive={this.toggleActive}
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
        {i18n('modals.digitalAssetManager.addCustomTokenTitle')}
      </div>
    )
  }

  toggleActive = (address) => {
    return (/* new checkbox state here */) => (e) => {
      this.props.toggleDigitalAsset(address)

      /**
       * clicking on checkbox call this function twice,
       * because currency row has the same onClick handler as well
       */
      e.stopPropagation()
    }
  }

  openCustomTokenModal = () => {
    const { openCurrenciesModal, closeCurrenciesModal, openCustomTokenModal } = this.props

    openCustomTokenModal(openCurrenciesModal)
    closeCurrenciesModal()
  }

  closeModal = () => this.props.closeCurrenciesModal()
  sortCurrencies = field => () => this.props.sortCurrencies(field)
}

CurrenciesModal.propTypes = {
  openCurrenciesModal: PropTypes.func.isRequired,
  closeCurrenciesModal: PropTypes.func.isRequired,
  toggleDigitalAsset: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  openCustomTokenModal: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
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
  modalName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isActiveAll: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
  balances: PropTypes.shape({}),
}

CurrenciesModal.defaultProps = {
  ...JModal.defaultProps,
  onClose: () => {},
  balances: {},
}

export default CurrenciesModal
