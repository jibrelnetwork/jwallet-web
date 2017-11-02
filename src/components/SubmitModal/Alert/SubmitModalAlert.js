import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalAlert({ text }) {
  return !text ? null : <div className='modal-alert'>{text}</div>
}

SubmitModalAlert.propTypes = {
  text: PropTypes.node,
}

SubmitModalAlert.defaultProps = {
  text: null,
}

export default SubmitModalAlert
