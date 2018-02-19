import React from 'react'
import PropTypes from 'prop-types'

const KeysLayout = ({ children }) => (
  <div>
    {
    /*
      <div>{'Aside'}</div>
      <div>{'Title'}</div>
      <div>{'ESC button'}</div>
    */
    }
    <div>{children}</div>
  </div>
)

KeysLayout.propTypes = {
  /* optional */
  children: PropTypes.element,
}

KeysLayout.defaultProps = {
  children: null,
}

export default KeysLayout
