import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModal({ closeModal, header, body, footer, name, isOpen }) {
  if (!isOpen) {
    return null
  }

  const closeIcon = <JIcon name='close' small className='modal__close' onClick={closeModal} />

  return (
    <div className='modal-wrap'>
      <div className='modal__overlay' onClick={closeModal} />
      <div className={`modal modal--${name}`}>
        <div className='modal__content'>
          <div className='modal__header'>
            {header}
            {closeIcon}
          </div>
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
  className: PropTypes.string,
  isOpen: PropTypes.bool,
}

JModal.defaultProps = {
  className: '',
  isOpen: false,
}

export default JModal
