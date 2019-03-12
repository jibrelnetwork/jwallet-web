// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import JThumbnail from 'components/base/JThumbnail'

import {
  type JThumbnailColor,
  type JThumbnailImage,
  type JThumbnailDescription,
} from 'components/base/JThumbnail/JThumbnail'

type Props = {|
  +color: JThumbnailColor,
  +image: JThumbnailImage,
  +description: JThumbnailDescription,
  +isTransparent: boolean,
|}

class OverlayNotification extends PureComponent<Props> {
  static defaultProps = {
    isTransparent: false,
  }

  render() {
    const {
      image,
      color,
      description,
      isTransparent,
    } = this.props

    return (
      <div className={classNames('overlay-notification', isTransparent && '-transparent')}>
        <JThumbnail
          color={color}
          image={image}
          description={description}
        />
      </div>
    )
  }
}

export default OverlayNotification
