import React from 'react'
import PropTypes from 'prop-types'

import JModalContentHeader from './Header'
import JModalContentBody from './Body'
import JModalContentFooter from './Footer'

function JModalContent(props) {
  const { closeModal, header, body, footer, className } = props

  return (
    <div className={className}>
      <div className='modal-content'>
        <JModalContentHeader closeModal={closeModal} header={header} />
        <JModalContentBody body={body} />
        <JModalContentFooter footer={footer} />
      </div>
    </div>
  )
}

JModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default JModalContent
