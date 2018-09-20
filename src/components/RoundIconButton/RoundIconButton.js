// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const RoundIconButton = ({
  onClick,
  iconName,
  color,
  label,
  spinOnHover,
  isBorder,
  isBgColor,
}: Props) => (
  <div onClick={onClick} className='round-icon-button'>
    {label && (
      <div className='label'>
        <JText value={label} color={color} fontCase='upper' />
      </div>
    )}
    <div className={classNames(
      `icon -${color}`,
      isBgColor && '-bg-blue',
      spinOnHover && '-spin',
      isBorder && '-border')}
    >
      <JIcon name={iconName} color={color} size='medium' />
    </div>
  </div>
)

type Props = {
  onClick: Function,
  label: ?string,
  iconName: string,
  color: 'gray' | 'white',
  spinOnHover: boolean,
  isBorder: boolean,
  isBgColor: boolean
}

RoundIconButton.defaultProps = {
  color: 'white',
  label: null,
  spinOnHover: false,
  isBorder: false,
  isBgColor: false,
}

export default RoundIconButton
