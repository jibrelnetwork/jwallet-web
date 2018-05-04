// @flow

import React from 'react'
import classNames from 'classnames'
import { JIcon, JText } from 'react-components'

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
  label: ?string,
  iconName: string,
  color: 'gray' | 'white',
  spinOnHover: boolean,
}

RoundIconButton.defaultProps = {
  label: null,
  spinOnHover: false,
}

export default RoundIconButton
