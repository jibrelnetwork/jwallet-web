import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './jbIcon.scss'

function JbIcon({ name, small }) {
  return <span className={`icon icon--${name} ${small ? 'small' : ''}`} />
}

JbIcon.propTypes = {
  name: PropTypes.string.isRequired,
  small: PropTypes.bool,
}

export default JbIcon
