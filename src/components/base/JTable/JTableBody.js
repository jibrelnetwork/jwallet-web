import React from 'react'
import PropTypes from 'prop-types'

function JTableBody(props) {
  return <div className='table-body'>{props.children}</div>
}

JTableBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
}

export default JTableBody
