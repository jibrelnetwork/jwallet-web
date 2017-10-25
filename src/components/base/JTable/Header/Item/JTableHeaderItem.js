import React from 'react'
import PropTypes from 'prop-types'

import { JCheckbox, JIcon } from 'components/base'

function JTableHeaderItem(props) {
  const {
    onClick,
    onToggle,
    name,
    title,
    colWidth,
    sortField,
    sortDirection,
    isReadOnly,
    isChecked,
    isCheckable,
  } = props

  const isActive = (sortField === name)
  const isDesc = (sortDirection === 'DESC')

  const itemClassName = 'table-header-item'
  const itemReadOnlyClassName = isReadOnly ? `${itemClassName}--read-only` : ''
  const itemSpecificClassName = `${itemClassName}--${name}`
  const fullItemClassName = `${itemClassName} ${itemSpecificClassName} ${itemReadOnlyClassName}`
  const iconActiveClassName = isActive ? 'table-header-item__icon--active' : ''

  const checkbox = !isCheckable ? null : (
    <JCheckbox toggle={onToggle} isActive={isChecked} className='pull-left' />
  )

  const icon = isReadOnly ? null : (
    <JIcon
      small
      name={`small-arrow${(isActive && isDesc) ? '' : '-up'}`}
      className={`table-header-item__icon ${iconActiveClassName} pull-left`}
    />
  )

  return (
    <div
      className={`${fullItemClassName} col ${colWidth} clear`}
      onClick={isReadOnly ? null : onClick}
    >
      {checkbox}<span className='table-header-item__title pull-left'>{title}</span>{icon}
    </div>
  )
}

JTableHeaderItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  colWidth: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isCheckable: PropTypes.bool,
  isChecked: PropTypes.bool,
}

JTableHeaderItem.defaultProps = {
  onClick: () => {},
  onToggle: () => {},
  sortField: '',
  sortDirection: '',
  isReadOnly: false,
  isCheckable: false,
  isChecked: false,
}

export default JTableHeaderItem
