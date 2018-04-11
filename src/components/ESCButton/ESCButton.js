// @flow

import React from 'react'

import RoundIconButton from 'components/RoundIconButton'

const ESCButton = ({ color, onClick }: Props) => (
  <div className='esc-button'>
    <RoundIconButton
      onClick={onClick}
      iconName='close-header'
      color={color}
      label='ESC'
      spinOnHover
    />
  </div>
)

type Props = {
  onClick: Function,
  color: 'white' | 'gray',
}

ESCButton.defaultProps = {
  onClick: () => {},
  color: 'white',
}

export default ESCButton
