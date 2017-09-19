import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-toolbox/lib/link'

function JLogo({ className }) {
  return (
    <Link href='/' className={`logo pull-left ${className}`}>
      <div className='logo__image' />
    </Link>
  )
}

JLogo.propTypes = {
  className: PropTypes.string,
}

JLogo.defaultProps = {
  className: '',
}

export default JLogo
