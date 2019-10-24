// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import {
  JIcon,
  JText,
} from 'components/base'

export type JThumbnailColor = 'white' | 'gray' | 'blue' | 'red'
export type JThumbnailDescription = string | string[]

export type JThumbnailImage =
  | 'auth-question'
  | 'auth-cross'
  | 'screen-search'
  | 'screen-reload'
  | 'screen-error'
  | 'screen-no-favorites'
  | 'bad-browser'

type Props = {|
  +title: ?string,
  +image: JThumbnailImage,
  +color: JThumbnailColor,
  +description: JThumbnailDescription,
  isTransparent: boolean,
|}

class JThumbnail extends PureComponent<Props, *> {
  static defaultProps = {
    title: null,
    isTransparent: false,
  }

  render() {
    const {
      image,
      color,
      isTransparent,
      title,
      description,
    } = this.props

    return (
      <div className={classNames('j-thumbnail', `-${color}`, isTransparent && '-transparent')} >
        <div className='icon'>
          <JIcon name={image} />
        </div>
        {title && (
          <div className='title'>
            <JText value={title} color={color} size='header' weight='bold' />
          </div>
        )}
        <div className='description'>
          {Array.isArray(description) ? description.map(str => (
            <JText
              key={str}
              value={str}
              color={color}
              align='center'
              whiteSpace='wrap'
            />
          )) : (
            <JText
              color={color}
              value={description}
              align='center'
              whiteSpace='wrap'
            />
          )}
        </div>
      </div>
    )
  }
}

export default JThumbnail
