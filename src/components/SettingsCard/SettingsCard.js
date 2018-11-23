// @flow

import React from 'react'

import { Link } from 'react-router'
import { JIcon, JText } from 'components/base'

type Props = {|
  +title: string,
  +description: string,
  +path: string,
  +iconName: string,
  +iconColor: 'white' | 'blue' | 'gray' | 'sky' | 'red',
|}

SettingsCard.defaultProps = {
  iconColor: 'blue',
}

function SettingsCard(props: Props) {
  const {
    iconName,
    iconColor,
    path,
    title,
    description,
  } = props

  return (
    <Link to={path} className='settings-card'>
      {iconName &&
      <div className='icon'>
        <JIcon
          color={iconColor}
          name={iconName}
        />
      </div>}
      <div className='summary'>
        <div className='title'>
          <JText value={title} color='dark' size='header' />
        </div>
        {description &&
        <div className='description'>
          <JText value={description} color='dusk' />
        </div>}
      </div>
    </Link>
  )
}

export default SettingsCard
