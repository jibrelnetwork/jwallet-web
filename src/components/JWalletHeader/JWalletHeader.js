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
    setCurrentNetwork,
    setCustomNetworkValue,
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
          setCurrentNetwork={setCurrentNetwork}
          setCustomNetworkValue={setCustomNetworkValue}
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
  setCurrentNetwork: PropTypes.func.isRequired,
  setCustomNetworkValue: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    customNetworkRpc: PropTypes.string.isRequired,
    currentNetworkIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  accountName: PropTypes.string.isRequired,
}

export default JWalletHeader
