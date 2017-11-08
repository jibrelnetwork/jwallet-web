import React from 'react'
import PropTypes from 'prop-types'

import SubmitModalBodyImage from './Image'

function SubmitModalBody(props) {
  const { body, imageName } = props

  return imageName.length
    ? <SubmitModalBodyImage name={imageName} />
    : <div className='modal-content-body'>{body}</div>
}

SubmitModalBody.propTypes = {
  body: PropTypes.node.isRequired,
  imageName: PropTypes.string.isRequired,
}

export default SubmitModalBody
