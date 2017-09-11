import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from '../JbIcon/'

function JbAlert({ text }) {
  return <div className='modal-info'>
    <JbIcon name='alert'/>
    <p className='modal-info--text'>{text}</p>
  </div>
}

JbAlert.propTypes = {
  text: PropTypes.string.isRequired,
}

export default JbAlert
