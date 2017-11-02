import React from 'react'
import PropTypes from 'prop-types'

function JModalContentBody(props) {
  return <div className='modal-body'>{props.body}</div>
}

JModalContentBody.propTypes = {
  body: PropTypes.node.isRequired,
}

export default JModalContentBody
