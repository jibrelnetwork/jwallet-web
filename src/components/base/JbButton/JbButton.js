import React from 'react'
import PropTypes from 'prop-types'

function JbButton({ onClick, label, className, disabled, white, blue, fullWidth, ...otherProps }) {
  let buttonClassName = fullWidth ? 'button button--full-width' : 'button'

  if (disabled) {
    buttonClassName = `${buttonClassName} button--disabled`
  } else if (white) {
    buttonClassName = `${buttonClassName} button--white`
  } else if (blue) {
    buttonClassName = `${buttonClassName} button--blue`
  }

  return (
    <div onClick={disabled ? null : onClick} className={buttonClassName} {...otherProps}>
      {label}
    </div>
  )
}

JbButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  blue: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

JbButton.defaultProps = {
  onClick: () => {},
  className: '',
  disabled: false,
  white: false,
  blue: true,
  fullWidth: false,
}

export default JbButton
