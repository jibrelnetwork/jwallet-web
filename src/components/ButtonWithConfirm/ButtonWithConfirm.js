// @flow

import React from 'react'
import classNames from 'classnames'
import { identity } from 'ramda'

import handle from 'utils/eventHandlers/handle'
import JButton from 'components/base/JButton'

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
      <JButton onClick={handle(toggle)(true)} text={label} color='gray' transparent minimal />
    </div>
    <div className={classNames('back', { '-active': isActive })}>
      <div className='button'>
        <JButton onClick={onClick} text={labelConfirm} color='gray' transparent minimal />
      </div>
      <div className='button -right'>
        <JButton onClick={handle(toggle)(false)} text={labelCancel} color='blue' minimal />
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
  onClick: identity,
  toggle: identity,
  label: 'Do smth.',
  labelConfirm: 'Ok',
  labelCancel: 'Nope!',
  isActive: false,
}

export default ButtonWithConfirm
