import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function NetworksManagerTitle({ title }) {
  return (
    <div className='networks-manager-title'>
      <div className='networks-manager-title__head'>{title}</div>
      <JIcon name='networks' className='networks-manager-title__icon' />
    </div>
  )
}

NetworksManagerTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NetworksManagerTitle
