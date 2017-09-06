import React from 'react'
import PropTypes from 'prop-types'

function JbSelect(props) {
  const {
    list,
    error,
    selected,
    label,
  } = props

  const htmlListEl = list.length ? list.map((item, i) => <li key={i}><a href="#">{item.text}</a></li>) : null;

  const selectedEl = selected ? <a href="#select" className="selected">{selected.text}</a> : null;

  const errorEl = error ? <div className="message">{error}</div> : null;

  return (<div className="field field-select">
            <div className="select">
              <label>{label}</label>
              {selectedEl}
              {htmlList && <ul class="scroll" id="select">{htmlList}</ul>}
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
