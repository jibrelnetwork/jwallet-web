// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const RoundIconButton = ({ onClick, iconName, color, label, spinOnHover }: Props) => (
  <div onClick={onClick} className='round-icon-button'>
    {label && (
      <div className='label'>
        <JText value={label} color={color} fontCase='upper' />
      </div>
    )}
    <div className={classNames(`icon -${color}`, spinOnHover && '-spin')}>
      <JIcon name={iconName} color={color} size='medium' />
    </div>
  </div>
)

type Props = {
  onClick: Function,
  iconName: string,
  color: 'white' | 'gray',
  label: ?string,
  spinOnHover: boolean,
}

RoundIconButton.defaultProps = {
  onClick: null,
  iconName: 'arrow-popup',
  color: 'white',
  label: null,
  spinOnHover: false,
}

export default RoundIconButton
