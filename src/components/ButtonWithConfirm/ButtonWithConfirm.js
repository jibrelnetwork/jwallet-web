// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

const ButtonWithConfirm = ({
  toggle,
  onClick,
  setHovered,
  label,
  labelCancel,
  labelConfirm,
  isActive,
  isHovered,
}: Props) => (
  <div className='button-with-confirm'>
    <div className={classNames('front', { '-active': !isActive })}>
      <JFlatButton onClick={handle(toggle)(true)} label={label} color='gray' isTransparent />
    </div>
    <div className={classNames('back', { '-active': isActive })}>
      <div className='button'>
        <JFlatButton onClick={onClick} label={labelConfirm} color='gray' isTransparent />
      </div>
      <div
        onMouseEnter={handle(setHovered)(true)}
        onMouseLeave={handle(setHovered)(false)}
        className='button -right'
      >
        <JFlatButton
          onClick={handle(toggle)(false)}
          label={labelCancel}
          color={isHovered ? 'sky' : 'blue'}
          isOpaque
        />
      </div>
    </div>
  </div>
)

type Props = {
  toggle: Function,
  onClick: Function,
  setHovered: Function,
  label: string,
  labelCancel: string,
  labelConfirm: string,
  isActive: boolean,
  isHovered: boolean,
}

export default ButtonWithConfirm
