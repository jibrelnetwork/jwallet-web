import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-toolbox/lib/link'

function JbLogo({ className }) {
  return <Link href='/' className={`logo pull-left ${className}`} />
}

JbLogo.propTypes = {
  className: PropTypes.string,
}

JbLogo.defaultProps = {
  className: '',
}

export default JbLogo
