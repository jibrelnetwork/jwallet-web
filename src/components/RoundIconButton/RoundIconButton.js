// @flow

import React from 'react'

import { JIcon, JText } from 'components/base'

const RoundIconButton = ({ onClick, iconName, color, label }: Props) => (
  <div onClick={onClick} className='round-icon-button'>
    {label && (
      <div className='label'>
        <JText value={label} variants={['uppercase', color]} />
      </div>
    )}
    <div className='icon'>
      <JIcon name={iconName} size='medium' />
    </div>
  </div>
)

type Props = {
  onClick: Function,
  iconName: string,
  color: 'white' | 'gray',
  label: ?string,
}

RoundIconButton.defaultProps = {
  onClick: null,
  iconName: 'arrow-popup',
  color: 'white',
  label: null,
}

export default RoundIconButton
