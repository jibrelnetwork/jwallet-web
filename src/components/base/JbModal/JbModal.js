import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function JbModal({ closeModal, header, body, footer, name, isOpen }) {
  if (!isOpen) {
    return null
  }

  const closeIcon = <JbIcon name='close' small className='modal__close' onClick={closeModal} />

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

JbModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
}

JbModal.defaultProps = {
  className: '',
  isOpen: false,
}

export default JbModal
