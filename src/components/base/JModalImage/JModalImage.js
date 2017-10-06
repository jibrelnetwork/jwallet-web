import React from 'react'
import PropTypes from 'prop-types'

function JModalImage({ name }) {
  return <div className={`modal-image modal-image--${name}`} />
}

JModalImage.propTypes = {
  name: PropTypes.string.isRequired,
}

export default JModalImage
