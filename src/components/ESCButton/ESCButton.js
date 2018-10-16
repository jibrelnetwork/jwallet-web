// @flow

import React from 'react'

import RoundIconButton from 'components/RoundIconButton'

const ESCButton = ({ onClick, color }: Props) => (
  <div className='esc-button'>
    <RoundIconButton
      onClick={onClick}
      iconName='arrow-left'
      color={color}
    />
  </div>
)

type Props = {
  onClick: Function,
  color: 'white' | 'gray',
}

export default ESCButton
