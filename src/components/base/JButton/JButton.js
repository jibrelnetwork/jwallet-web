import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import JIcon from 'components/base/JIcon'

function JButton(props) {
  const { onClick, label, className, iconName, disabled, white, blue, fullWidth, ...other } = props
  let buttonClassName = fullWidth ? 'button button--full-width' : 'button'

  if (disabled) {
    buttonClassName = `${buttonClassName} button--disabled`
  } else if (white) {
    buttonClassName = `${buttonClassName} button--white`
  } else if (blue) {
    buttonClassName = `${buttonClassName} button--blue`
  }

  return (
    <div onClick={disabled ? null : onClick} className={buttonClassName} {...other}>
      <JIcon name={iconName} className='button__icon' small />{label}
    </div>
  )
}

JButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  blue: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

JButton.defaultProps = {
  onClick: () => {},
  className: '',
  iconName: '',
  disabled: false,
  white: false,
  blue: true,
  fullWidth: false,
}

export default JButton
