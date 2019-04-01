// @flow

import React, {
  Fragment,
  PureComponent,
} from 'react'

import {
  JIcon,
  JText,
  JLink,
} from 'components/base'

import { type JIconColor } from 'components/base/JIcon/JIcon'

export type Props = {|
  +title: string,
  +path: string,
  +iconName: string,
  +description: string,
  +iconColor: JIconColor,
|}

class SettingsGridCard extends PureComponent<Props, *> {
  static defaultProps = {
    iconColor: 'blue',
  }

  renderContent = () => {
    const {
      title,
      description,
      iconColor,
      iconName,
    } = this.props

    return (
      <Fragment>
        <div className='icon'>
          <JIcon
            color={iconColor}
            name={iconName}
          />
        </div>
        <div className='summary'>
          <div className='title'>
            <JText value={title} color='dark' size='header' />
          </div>
          {description && (
            <div className='description'>
              <JText value={description} color='dusk' />
            </div>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    const { path } = this.props

    return (
      <JLink
        href={path}
        className='settings-grid-card'
      >
        {this.renderContent()}
      </JLink>
    )
  }
}

export default SettingsGridCard
