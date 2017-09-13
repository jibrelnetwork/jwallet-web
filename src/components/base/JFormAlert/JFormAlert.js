import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

function JFormAlert({ text }) {
  return (
    <div className='form-alert'>
      <JbIcon name='alert' className='form-alert__icon' />
      <div className='form-alert__text'>{text}</div>
    </div>
  )
}

JFormAlert.propTypes = {
  text: PropTypes.string.isRequired,
}

export default JFormAlert
