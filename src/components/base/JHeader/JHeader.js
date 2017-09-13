import React from 'react'
import PropTypes from 'prop-types'

import JLogo from 'components/base/JLogo'

function JHeader({ children }) {
  return (
    <div className='header'>
      <JLogo className='header__logo' />
      {children}
    </div>
  )
}

JHeader.propTypes = {
  children: PropTypes.element.isRequired,
}

export default JHeader
