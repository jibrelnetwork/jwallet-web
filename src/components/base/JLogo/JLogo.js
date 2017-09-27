import React from 'react'
import PropTypes from 'prop-types'

function JLogo({ className }) {
  return <a href='/' className={`logo pull-left ${className}`}><div className='logo__image' /></a>
}

JLogo.propTypes = {
  className: PropTypes.string,
}

JLogo.defaultProps = {
  className: '',
}

export default JLogo
