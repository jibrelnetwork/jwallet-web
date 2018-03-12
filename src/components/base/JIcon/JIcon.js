import React from 'react'
import PropTypes from 'prop-types'

function JIcon({ name, small, className, ...otherProps }) {
  return (
    <span
      className={`icon icon--${name} ${small ? 'icon--small' : ''} ${className}`}
      {...otherProps}
    />
  )
}

JIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,
}

JIcon.defaultProps = {
  className: '',
  small: false,
}

export default JIcon
