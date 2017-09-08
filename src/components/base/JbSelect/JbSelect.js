import React from 'react'
import PropTypes from 'prop-types'

function JbSelect(props) {
  const {
    list,
    error,
    selected,
    label,
  } = props

  const htmlListItems = list.length ? list.map((item, i) => {
    return <li key={i}><a href="#">{item.text}</a></li>
  }) : null

  const htmlListEl = htmlListItems ? <ul class="scroll" id="select">{htmlListItems}</ul> : null

  const selectedEl = selected ? <a href="#select" className="selected">{selected.text}</a> : null

  const errorEl = error ? <div className="message">{error}</div> : null

  return (<div className="field field-select">
    <div className="select">
      <label>{label}</label>
      {selectedEl}
      {htmlListEl}
      {errorEl}
    </div>
  </div>)
}

JbSelect.propTypes = {
  list: PropTypes.arrayOf.object,
  selected: PropTypes.object,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}


export default JbSelect
