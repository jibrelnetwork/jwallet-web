import React from 'react'
import PropTypes from 'prop-types'

function JSelect(props) {
  const {
    list,
    error,
    selected,
    label,
  } = props

  const htmlListItems = list.length ? list.map((item, i) => {
    return <li key={i}><a href='#'>{item.text}</a></li>
  }) : null

  const htmlListEl = htmlListItems ? <ul className='select-list__list'>{htmlListItems}</ul> : null

  const selectedEl = selected ? <a href='#select' className='select-list__selected'>{selected.text}</a> : null

  const errorEl = error ? <div className='select-list__message'>{error}</div> : null

  return (<div className='select-list'>
    <label className='select-list__label'>{label}</label>
    {selectedEl}
    {htmlListEl}
    {errorEl}
  </div>)
}

JSelect.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.object,
  error: PropTypes.string,
}

JSelect.defaultProps = {
  error: '',
  selected: {
    text: '',
  },
}

export default JSelect
