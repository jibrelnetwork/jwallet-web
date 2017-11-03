import { connect } from 'react-redux'

import {
  closeNewKeystoreAccountModal,
  setNewKeystoreAccountMnemonicConfirm,
  setNewKeystoreAccountPassword,
  setNewKeystoreAccountPasswordConfirm,
  setNewKeystoreAccountCurrentStep,
} from 'routes/JWallet/modules/modals/newKeystoreAccount'

import NewKeystoreAccountModal from './NewKeystoreAccountModal'

const mapStateToProps = (state) => {
  const { newKeystoreAccountModal, keystore } = state
  const { currentStep, totalSteps } = newKeystoreAccountModal
  const { isCreating, currentAccount } = keystore

  return {
    ...newKeystoreAccountModal,
    modalName: 'new-keystore-account',
    modalTitle: 'Create new key',
    topLineFullness: `${100 * (currentStep / totalSteps)}%`,
    isInitialized: !!currentAccount.id.length,
    isButtonLoading: isCreating,
    isCreating,
  }
}

const mapDispatchToProps = {
  closeNewKeystoreAccountModal,
  setNewKeystoreAccountMnemonicConfirm,
  setNewKeystoreAccountPassword,
  setNewKeystoreAccountPasswordConfirm,
  setNewKeystoreAccountCurrentStep,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeystoreAccountModal)
