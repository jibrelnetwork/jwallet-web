import React from 'react'
import PropTypes from 'prop-types'

function SubmitModalTopLine(props) {
  const { width } = props

  if (!(width && width.length)) {
    return null
  }

  return (
    <div className='modal-step-line'>
      <div className='modal-step-line__overlay' style={{ width }} />
    </div>
  )
}

SubmitModalTopLine.propTypes = {
  width: PropTypes.string,
}

SubmitModalTopLine.defaultProps = {
  width: '',
}

export default SubmitModalTopLine
