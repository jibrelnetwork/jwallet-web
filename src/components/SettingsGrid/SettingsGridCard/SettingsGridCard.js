// @flow

import React, { Fragment, PureComponent } from 'react'

import { Link } from 'react-router'
import { JIcon, JText } from 'components/base'
import type { JIconColor } from 'components/base/JIcon/JIcon'

type Props = {|
  +title: string,
  +description: string,
  +path: string,
  +iconName: string,
  iconColor?: JIconColor,
|}

const isExternalURL = (url: string): boolean => /^https?:\/\//.test(url)

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
          {description &&
          <div className='description'>
            <JText value={description} color='dusk' />
          </div>}
        </div>
      </Fragment>
    )
  }

  render() {
    const { path } = this.props

    if (isExternalURL(path)) {
      return (
        <a href={path} className='settings-grid-card' rel='noreferrer noopener' target='_blank'>
          {this.renderContent()}
        </a>
      )
    }

    return (
      <Link to={path} className='settings-grid-card'>
        {this.renderContent()}
      </Link>
    )
  }
}

export default SettingsGridCard
