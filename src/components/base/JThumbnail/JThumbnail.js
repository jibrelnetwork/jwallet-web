// @flow

import React, { PureComponent } from 'react'

import { JText, JIcon } from 'components/base'

type JThumbnailImage = 'key' | 'man' | 'cloud' | 'auth-question' | 'auth-cross'

type Props = {|
  +title: string,
  +description: string | Array<string>,
  +image: JThumbnailImage,
  +color: 'white' | 'gray' | 'blue',
|}

class JThumbnail extends PureComponent<Props, *> {
  static defaultProps = {
    title: '',
    color: 'white',
    description: '',
  }

  render() {
    const {
      image,
      color,
      title,
      description,
    } = this.props

    return (
      <div className='j-thumbnail' >
        <JIcon size='xlarge' name={image} />
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
