import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function JbModal({ closeModal, head, body, name, isOpen }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-wrap'>
      <div className='modal__overlay' onClick={closeModal} />
      <div className={`modal modal--${name}`}>
        <div className='modal__content'>
          <div className='modal__header'>
            {head}
            <div className='modal__close' onClick={closeModal}>
              <JbIcon name='close' small />
            </div>
          </div>
          <div className='modal__body'>
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

JbModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  head: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
}

export default JbModal
