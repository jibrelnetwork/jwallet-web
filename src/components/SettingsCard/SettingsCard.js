// @flow

import React, { PureComponent } from 'react'

import { Link } from 'react-router'
import { JIcon, JText } from 'components/base'
import type { JIconColor } from 'components/base/JIcon/JIcon'

type Props = {|
  +title: string,
  +description: string,
  +path: string,
  +iconName: string,
  +iconColor: JIconColor,
|}

class SettingsCard extends PureComponent<Props, *> {
  static defaultProps = {
    iconColor: 'blue',
  }

  render() {
    const {
      iconName,
      iconColor,
      path,
      title,
      description,
    } = this.props

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
}

export default SettingsCard
