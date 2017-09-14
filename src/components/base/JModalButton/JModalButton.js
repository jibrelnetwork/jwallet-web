import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModalButton({ onPress, name, title, iconName, disabled }) {
  return (
    <div
      type='button'
      className={`modal-button modal-button--${name}`}
      disabled={disabled}
      onClick={onPress}
    >
      <div className='modal-button__title'>
        <JIcon name={iconName} className='modal-button__icon' />{title}
      </div>
    </div>
  )
}

JModalButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

JModalButton.defaultProps = {
  disabled: false,
}

export default JModalButton
