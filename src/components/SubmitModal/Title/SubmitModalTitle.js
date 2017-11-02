import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalTitle(props) {
  return <div className='modal-title'>{props.title}</div>
}

SubmitModalTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SubmitModalTitle
