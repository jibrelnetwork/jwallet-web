import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function Warning({ color, text, close, index, isOpen }) {
  if (!isOpen) {
    return null
  }

  const top = `${index * 20}px`
  const closeIcon = !close ? null : <JIcon name='close' className='warning__icon' />

  return (
    <div
      style={{ top }}
      className={`warning-wrap warning-wrap--${color} ${close ? 'warning-wrap--close' : ''}`}
    >
      <div className='warning'>
        <div className='warning__text'>{text}</div>
        {closeIcon}
      </div>
    </div>
  )
}

Warning.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  /* optional */
  close: PropTypes.func,
  isOpen: PropTypes.bool,
}

Warning.defaultProps = {
  close: null,
  isOpen: false,
}

export default Warning
