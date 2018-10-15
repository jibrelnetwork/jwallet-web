// @flow

import React, { PureComponent } from 'react'

import { JText, JIcon } from 'components/base'

type Props = {
  title: string,
  description: string,
  image: 'key' | 'man' | 'cloud',
  color: 'white' | 'gray' | 'blue',
}

class JThumbnail extends PureComponent<Props, *> {
  static defaultProps = {
    title: '',
    color: 'white',
    image: 'cloud',
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
        <JIcon
          size='xlarge'
          name={image}
        />
        {title && (
          <div className='title'>
            <JText value={title} color={color} size='thumbnail-title' weight='bold' />
          </div>
        )}
        <div className='description'>
          {description.map(str => (
            <JText value={str} key={str} color={color} whiteSpace='wrap' align='center' />
          ))}
        </div>
      </div>
    )
  }
}

export default JThumbnail
