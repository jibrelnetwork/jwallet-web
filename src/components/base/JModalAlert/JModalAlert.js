import React from 'react'
import PropTypes from 'prop-types'

function JModalAlert({ text }) {
  return !text ? null : <div className='modal-alert'>{text}</div>
}

JModalAlert.propTypes = {
  text: PropTypes.node,
}

JModalAlert.defaultProps = {
  text: null,
}

export default JModalAlert
