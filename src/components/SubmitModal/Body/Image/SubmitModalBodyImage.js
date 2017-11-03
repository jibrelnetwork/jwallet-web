import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalBodyImage(props) {
  return <div className={`modal-image modal-image--${props.name}`} />
}

SubmitModalBodyImage.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SubmitModalBodyImage
