import React from 'react'
import PropTypes from 'prop-types'

function JLoader({ fixed }) {
  const className = `loader ${fixed ? 'loader--fixed' : ''}`

  return <div className={className} />
}

JLoader.propTypes = {
  fixed: PropTypes.bool,
}

JLoader.defaultProps = {
  fixed: false,
}

export default JLoader
