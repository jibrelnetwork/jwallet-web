import React from 'react'

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

export default JbInput
