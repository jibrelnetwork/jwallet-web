import React from 'react'
import PropTypes from 'prop-types'

import { JModalAlert, JIcon } from 'components/base'

function JModal({ closeModal, header, body, footer, name, alert, isOpen }) {
  if (!isOpen) {
    return null
  }

  const closeIcon = <JIcon name='close' small className='modal__close' onClick={closeModal} />
  const formAlert = alert.length ? <JModalAlert text={alert} /> : null

  return (
    <div className='modal-wrap'>
      <div className='modal__overlay' onClick={closeModal} />
      <div className={`modal modal--${name}`}>
        <div className='modal__content'>
          <div className='modal__header'>
            {header}
            {closeIcon}
          </div>
          <div className='modal__alert'>{formAlert}</div>
          <div className='modal__body'>{body}</div>
          <div className='modal__footer'>{footer}</div>
        </div>
      </div>
    </div>
  )
}

JModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  alert: PropTypes.string,
  isOpen: PropTypes.bool,
}

JModal.defaultProps = {
  alert: '',
  isOpen: false,
}

export default JModal
