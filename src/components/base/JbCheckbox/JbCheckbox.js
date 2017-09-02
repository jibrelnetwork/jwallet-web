import React from 'react'
import PropTypes from 'prop-types'

function JbCheckbox({ toggle, label, isActive }) {
  return (
    <div className='checkbox' onClick={toggle(!isActive)}>
      <div className={`checkbox__icon checkbox__icon--${isActive ? 'enabled' : 'disabled'}`} />
      <div className='checkbox__label'>{label}</div>
    </div>
  )
}

JbCheckbox.propTypes = {
  toggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}

export default JbCheckbox
