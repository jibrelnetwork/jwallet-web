import React from 'react'
import PropTypes from 'prop-types'

function JbInput(props) {
  const {
    label,
    error,
    placeholder,
  } = props

  return (<div className="field field-input">
    <input type="text" placeholder={placeholder} />
    <label htmlFor="field-2">{label}</label>
    {error && <div className="message">{error}</div>}
  </div>)
}

JbInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export default JbInput
