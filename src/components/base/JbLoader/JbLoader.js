import React from 'react'
import PropTypes from 'prop-types'

function JbLoader({ fixed }) {
  const className = `loader ${fixed ? 'loader--fixed' : ''}`

  return <div className={className} />
}

JbLoader.propTypes = {
  fixed: PropTypes.bool,
}

JbLoader.defaultProps = {
  fixed: false,
}

export default JbLoader
