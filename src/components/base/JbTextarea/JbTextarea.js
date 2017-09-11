import React from 'react'
import PropTypes from 'prop-types'

function JbTextarea(props) {
  const {
    label,
    error,
    placeholder,
    isDisabled,
  } = props

  const errorEl = error ? <div className='message'>{error}</div> : null

  return (<div className='field field-textarea'>
    <textarea placeholder={placeholder} disabled={isDisabled}>{}</textarea>
    <label>{label}</label>
    {errorEl}
  </div>)
}

JbTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
}

JbTextarea.defaultProps = {
  error: '',
  isDisabled: false,
}

export default JbTextarea
