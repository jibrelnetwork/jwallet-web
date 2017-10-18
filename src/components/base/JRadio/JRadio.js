import React from 'react'
import PropTypes from 'prop-types'

function JRadio({ toggle, name, isActive }) {
  return (
    <div className={`radio radio--${name}`} onClick={toggle}>
      <input
        readOnly
        type='radio'
        name={name}
        checked={isActive}
        className='radio__input'
      />
      <label htmlFor={name} className={`radio__label ${isActive ? 'radio__label--active' : ''}`} />
    </div>
  )
}

JRadio.propTypes = {
  name: PropTypes.string.isRequired,
  toggle: PropTypes.func,
  isActive: PropTypes.bool,
}

JRadio.defaultProps = {
  toggle: null,
  isActive: false,
}

export default JRadio
