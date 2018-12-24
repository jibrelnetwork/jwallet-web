// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JText, JIcon } from 'components/base'

export type JThumbnailDescription = string | Array<string>
export type JThumbnailImage = 'auth-question'
  | 'auth-cross'
  | 'screen-search'
  | 'screen-reload'
  | 'screen-no-favorites'

type Props = {|
  +title: ?string,
  +image: JThumbnailImage,
  +iconSize: 'large' | 'xlarge',
  +description: JThumbnailDescription,
  +color: 'white' | 'gray' | 'blue' | 'red',
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
      iconSize,
      color,
      isTransparent,
      title,
      description,
    } = this.props

    return (
      <div className={classNames('j-thumbnail', isTransparent && '-transparent')} >
        <div className='icon'>
          <JIcon size={iconSize} name={image} />
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
