// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

const ButtonWithConfirm = ({
  onClick,
  toggle,
  label,
  labelConfirm,
  labelCancel,
  isActive,
}: Props) => (
  <div className='button-with-confirm'>
    <div className={classNames('front', { '-active': !isActive })}>
      <JFlatButton onClick={handle(toggle)(true)} text={label} color='gray' transparent />
    </div>
    <div className={classNames('back', { '-active': isActive })}>
      <div className='button'>
        <JFlatButton onClick={onClick} text={labelConfirm} color='gray' transparent />
      </div>
      <div className='button -right'>
        <JFlatButton onClick={handle(toggle)(false)} text={labelCancel} color='blue' />
      </div>
    </div>
  </div>
)

type Props = {
  onClick: Function,
  toggle: Function,
  label: string,
  labelConfirm: string,
  labelCancel: string,
  isActive: boolean,
}

ButtonWithConfirm.defaultProps = {
  onClick: () => {},
  toggle: () => {},
  label: '',
  labelConfirm: 'Ok',
  labelCancel: 'Nope!',
  isActive: false,
}

export default ButtonWithConfirm
