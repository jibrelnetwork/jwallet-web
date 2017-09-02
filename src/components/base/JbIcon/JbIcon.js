import React from 'react'
import PropTypes from 'prop-types'

function JbIcon({ name, className = '', small }) {
  return <span className={`icon icon--${name} ${small ? 'icon--small' : ''} ${className}`} />
}

JbIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,
}

export default JbIcon
