import React from 'react'
import PropTypes from 'prop-types'

function JbIcon({ name, small, className, ...otherProps }) {
  return (
    <span
      className={`icon icon--${name} ${small ? 'icon--small' : ''} ${className}`}
      {...otherProps}
    />
  )
}

JbIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,
}

JbIcon.defaultProps = {
  className: '',
  small: false,
}

export default JbIcon
