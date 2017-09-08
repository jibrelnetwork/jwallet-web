import React from 'react'
import PropTypes from 'prop-types'

import JbLogo from 'components/base/JbLogo'

function JbHeader({ children }) {
  return (
    <div className='header'>
      <JbLogo className='header__logo' />
      {children}
    </div>
  )
}

JbHeader.propTypes = {
  children: PropTypes.element.isRequired,
}

export default JbHeader
