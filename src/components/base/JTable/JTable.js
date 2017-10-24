import React from 'react'
import PropTypes from 'prop-types'

import JTableHeader from './Header'
import JTableBody from './Body'

function JTable(props) {
  const { children, name } = props

  return <div className={`table table--${name}`}>{children}</div>
}

JTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
}

JTable.Header = JTableHeader
JTable.Body = JTableBody

export default JTable
