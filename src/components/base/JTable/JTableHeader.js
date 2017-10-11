import React from 'react'
import PropTypes from 'prop-types'

import JTableHeaderItem from './JTableHeaderItem'

function JTableHeader(props) {
  const { items, onClick, onToggle, sortField, sortDirection } = props

  return (
    <div className='table-header table-row row'>
      {items.map((item) => {
        const { name, title, colWidth, isReadOnly, isCheckable, isChecked } = item

        return (
          <JTableHeaderItem
            key={name}
            onClick={onClick(name)}
            onToggle={onToggle}
            title={title}
            name={name}
            sortField={sortField}
            sortDirection={sortDirection}
            colWidth={colWidth}
            isReadOnly={isReadOnly}
            isCheckable={isCheckable}
            isChecked={isChecked}
          />
        )
      })}
    </div>
  )
}

JTableHeader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    colWidth: PropTypes.string.isRequired,
    isReadOnly: PropTypes.bool,
    isCheckable: PropTypes.bool,
    isChecked: PropTypes.bool,
  })).isRequired,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string,
}

export default JTableHeader
