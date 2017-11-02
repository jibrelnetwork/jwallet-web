import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalBody(props) {
  return <div className='modal-content-body'>{props.body}</div>
}

SubmitModalBody.propTypes = {
  body: PropTypes.node.isRequired,
  /* optional */
  imageName: PropTypes.string,
}

SubmitModalBody.defaultProps = {
  imageName: null,
}

export default SubmitModalBody
