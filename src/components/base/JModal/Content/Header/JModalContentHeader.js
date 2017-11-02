import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModalContentHeader(props) {
  const { closeModal, header } = props

  return (
    <div className='modal-header'>
      {header}<JIcon name='close' small className='modal-close' onClick={closeModal} />
    </div>
  )
}

JModalContentHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
}

export default JModalContentHeader
