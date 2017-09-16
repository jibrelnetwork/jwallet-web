import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModalButton({ onPress, name, title, iconName, disabled }) {
  const isIcon = (iconName.length > 0)
  const icon = isIcon ? <JIcon name={iconName} className='modal-button__icon' /> : null

  return (
    <div
      type='button'
      className={`modal-button modal-button--${name}`}
      disabled={disabled}
      onClick={onPress}
    >
      <div className={`modal-button__title ${isIcon ? 'modal-button__title--with-icon' : ''}`}>
        {icon}{title}
      </div>
    </div>
  )
}

JModalButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
}

JModalButton.defaultProps = {
  disabled: false,
  iconName: '',
}

export default JModalButton
