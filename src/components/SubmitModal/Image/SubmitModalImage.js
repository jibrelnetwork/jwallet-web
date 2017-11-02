import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalImage(props) {
  return <div className={`modal-image modal-image--${props.name}`} />
}

SubmitModalImage.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SubmitModalImage
