import React from 'react'
import PropTypes from 'prop-types'

function JModalContentFooter(props) {
  return <div className='modal-footer'>{props.footer}</div>
}

JModalContentFooter.propTypes = {
  footer: PropTypes.node.isRequired,
}

export default JModalContentFooter
