import React from 'react'
import PropTypes from 'prop-types'

function JbInput(props) {
  const {
    label,
    error,
    placeholder,
  } = props

  const errorEl = error ? <div className='message'>{error}</div> : null

  return (<div className='field field-input'>
    <input type='text' placeholder={placeholder} />
    <label htmlFor='field-2'>{label}</label>
    {errorEl}
  </div>)
}

JbInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
}

JbInput.defaultProps = {
  error: '',
}

export default JbInput
