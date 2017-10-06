import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function JModalButton({ onPress, name, title, iconName, disabled, isLoading }) {
  const isIcon = (iconName.length > 0)
  const icon = isIcon ? <JIcon name={iconName} className='modal-button__icon' /> : null
  const className = `modal-button modal-button--${name} ${disabled ? 'modal-button--disabled' : ''}`
  const labelClassName = `modal-button__title ${isIcon ? 'modal-button__title--with-icon' : ''}`

  const label = !isLoading
    ? <div className={labelClassName}>{icon}{title}</div>
    : (
      <div className='modal-button__loader'>
        <div className='loader__dot loader__dot--1' />
        <div className='loader__dot loader__dot--2' />
        <div className='loader__dot loader__dot--3' />
      </div>
    )
    /* GIF animation : <div className='modal-button__loader-image' /> */

  return <div className={className} onClick={(disabled || isLoading) ? null : onPress}>{label}</div>
}

JModalButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

JModalButton.defaultProps = {
  iconName: '',
  disabled: false,
  isLoading: false,
}

export default JModalButton
