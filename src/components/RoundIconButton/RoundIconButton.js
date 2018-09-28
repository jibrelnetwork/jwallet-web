// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const RoundIconButton = ({
  onClick,
  iconName,
  color,
  label,
  isBorder,
  bgColor,
  isBoxShadow,
}: Props) => (
  <div onClick={onClick} className='round-icon-button'>
    {label && (
      <div className='label'>
        <JText value={label} color={color} fontCase='upper' />
      </div>
    )}
    <div className={classNames(
      `icon -${color}`,
      bgColor && `-bg-${bgColor}`,
      isBoxShadow && '-box-shadow',
      isBorder && '-border',
    )}
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
  bgColor: 'blue' | null,
  isBorder: boolean,
  isBgColor: boolean,
  isBoxShadow: boolean,
}

RoundIconButton.defaultProps = {
  color: 'white',
  label: null,
  bgColor: null,
  isBorder: false,
  isBgColor: false,
  isBoxShadow: false,
}

export default RoundIconButton
