import React from 'react'
import PropTypes from 'prop-types'

import { JHeader } from 'components/base'

import { KeysManager, NetworksManager, CurrenciesManager } from 'components'

import HeaderMenu from './HeaderMenu'

function JWalletHeader(props) {
  const {
    openSendFundsModal,
    openReceiveFundsModal,
    openConvertFundsModal,
    openKeystoreModal,
    setActiveNetwork,
    saveCustomNetwork,
    removeCustomNetwork,
    openCurrenciesModal,
    accountName,
    networks,
  } = props

  return (
    <JHeader>
      <div className='clear'>
        <HeaderMenu
          openSendFundsModal={openSendFundsModal}
          openReceiveFundsModal={openReceiveFundsModal}
          openConvertFundsModal={openConvertFundsModal}
        />
        <NetworksManager
          setActiveNetwork={setActiveNetwork}
          saveCustomNetwork={saveCustomNetwork}
          removeCustomNetwork={removeCustomNetwork}
          networks={networks}
        />
        <KeysManager
          openKeystoreModal={openKeystoreModal}
          accountName={accountName}
        />
        <CurrenciesManager
          iconName='currencies-header'
          className='header__currencies-manager pull-right'
          onClick={openCurrenciesModal}
        />
      </div>
    </JHeader>
  )
}

JWalletHeader.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  openKeystoreModal: PropTypes.func.isRequired,
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      rpcAddr: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  accountName: PropTypes.string.isRequired,
}

export default JWalletHeader
