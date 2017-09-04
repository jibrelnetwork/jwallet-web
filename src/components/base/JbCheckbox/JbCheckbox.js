import React from 'react'
import PropTypes from 'prop-types'

function JbCheckbox({ toggle, label, isActive }) {
  const checkboxLabel = label.length ? <div className='checkbox__label'>{label}</div> : null

  return (
    <div className='checkbox' onClick={toggle(!isActive)}>
      <div className={`checkbox__icon checkbox__icon--${isActive ? 'enabled' : 'disabled'}`} />
      {checkboxLabel}
    </div>
  )
}

JbCheckbox.propTypes = {
  toggle: PropTypes.func.isRequired,
  label: PropTypes.string,
  isActive: PropTypes.bool,
}

JbCheckbox.defaultProps = {
  label: '',
  isActive: false,
}

export default JbCheckbox
