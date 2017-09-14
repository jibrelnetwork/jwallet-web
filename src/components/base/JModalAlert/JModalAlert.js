import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModalAlert({ text }) {
  return (
    <div className='modal-alert'>
      <JIcon name='alert' className='modal-alert__icon' />
      <div className='modal-alert__text'>{text}</div>
    </div>
  )
}

JModalAlert.propTypes = {
  text: PropTypes.string.isRequired,
}

export default JModalAlert
