import React from 'react'
import PropTypes from 'prop-types'

function JModalOverlay(props) {
  const { closeModal, className } = props

  return <div className={className} onClick={closeModal} />
}

JModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default JModalOverlay
