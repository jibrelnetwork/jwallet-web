import React from 'react'
import PropTypes from 'prop-types'
import Keystore from 'blockchain-wallet-keystore'

import { handleEnterKeyPress, isKnownPath } from 'utils'

import { DerivationPath } from 'components'
import { JModal, JModalButton } from 'components/base'

class NewDerivationPath extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'new-derivation-path' }
  }

  componentWillReceiveProps(nextProps) {
    const { setKnownDerivationPath, setCustomDerivationPath, currentDerivationPath } = this.props
    const nextPath = nextProps.currentDerivationPath

    if (currentDerivationPath !== nextPath) {
      if (isKnownPath(nextPath)) {
        return setKnownDerivationPath(nextPath)
      }

      return setCustomDerivationPath(nextPath)
    }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'New Derivation Path'}</div>
  }

  renderBody = () => {
    const { setCustomDerivationPath, knownDerivationPath } = this.props
    const fieldName = 'customDerivationPath'

    return (
      <DerivationPath
        setKnownDerivationPath={this.setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
      />
    )
  }

  renderFooter = () => {
    return (
      <JModalButton
        onPress={this.setDerivationPath}
        name={'new-derivation-path'}
        title={'Set derivation path'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  isModalButtonDisabled = () => (!!this.getInvalidFieldMessage('customDerivationPath').length)

  setKnownDerivationPath = path => () => this.props.setKnownDerivationPath(path)

  setDerivationPath = () => {
    const {
      setKeystoreAccountDerivationPath,
      accountId,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    const newPath = customDerivationPath.length ? customDerivationPath : knownDerivationPath

    // TODO: remove it
    const password = 'qwert12345!Q'

    setKeystoreAccountDerivationPath(password, accountId, newPath, this.onSuccess, this.onFail)
  }

  onSuccess = () => this.closeModal()

  onFail = (err) => {
    this.shake()
    this.props.setNewDerivationPathInvalidField('customDerivationPath', err.message)
  }

  closeModal = () => {
    const {
      closeNewDerivationPathModal,
      setKnownDerivationPath,
      setCustomDerivationPath,
      onClose
    } = this.props

    if (onClose) {
      onClose()
    }

    closeNewDerivationPathModal()
    setKnownDerivationPath()
    setCustomDerivationPath()
  }

  submitModal = event => handleEnterKeyPress(this.setDerivationPath)(event)
}

NewDerivationPath.propTypes = {
  closeNewDerivationPathModal: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setNewDerivationPathInvalidField: PropTypes.func.isRequired,
  setKeystoreAccountDerivationPath: PropTypes.func.isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  accountId: PropTypes.string.isRequired,
  currentDerivationPath: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

NewDerivationPath.defaultProps = {
  onClose: null,
}

export default NewDerivationPath
