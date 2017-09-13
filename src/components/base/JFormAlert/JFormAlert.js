import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JFormAlert({ text }) {
  return (
    <div className='form-alert'>
      <JIcon name='alert' className='form-alert__icon' />
      <div className='form-alert__text'>{text}</div>
    </div>
  )
}

JFormAlert.propTypes = {
  text: PropTypes.string.isRequired,
}

export default JFormAlert
