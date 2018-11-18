// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JText, JIcon } from 'components/base'

type JThumbnailImage = 'key' | 'man' | 'cloud' | 'auth-question' | 'auth-cross' | 'screen-search'

type Props = {|
  +title: string,
  +description: string | Array<string>,
  +image: JThumbnailImage,
  +iconSize: 'large' | 'xlarge',
  +color: 'white' | 'gray' | 'blue' | 'red',
  isTransparent: boolean,
|}

class JThumbnail extends PureComponent<Props, *> {
  static defaultProps = {
    title: '',
    iconSize: 'xlarge',
    color: 'white',
    isTransparent: false,
    description: '',
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
      <div className='j-thumbnail' >
        <div className={classNames('icon', isTransparent && '-transparent')}>
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
