import React from 'react'
import PropTypes from 'prop-types'

function JbSelect(props) {
  const {
    list,
    error,
    selected,
    label,
  } = props

  const htmlList = list.map((item, i) => {
    return (
      <li key={i}><a href="#">{item.text}</a></li>
    )
  })

  return (<div className="field field-select">
    <div className="select">
      <label>{label}</label>
      {selected && <a href="#select" className="selected">{selected.text}</a>}
      { htmlList && <ul class="scroll" id="select">
        {htmlList}
      </ul>}
      {error && <div className="message">{error}</div>}
    </div>
  </div>)
}

JbSelect.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.object,
  list: PropTypes.arrayOf.object,
  error: PropTypes.string,
}


export default JbSelect
