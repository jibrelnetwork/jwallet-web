import React from 'react'
import PropTypes from 'prop-types'

function JbIcon({ name, small }) {
  return <span className={`icon icon--${name} ${small ? 'icon--small' : ''}`} />
}

JbIcon.propTypes = {
  name: PropTypes.string.isRequired,
  small: PropTypes.bool,
}

export default JbIcon
