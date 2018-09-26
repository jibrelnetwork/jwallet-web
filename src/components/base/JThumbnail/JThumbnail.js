// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import JText from 'components/base/JText'

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
        <div className={classNames('image', `-${image}`, `-${color}`)} />
        {title && (
          <div className='title'>
            <JText value={title} color={color} size='header' />
          </div>
        )}
        <div className='description'>
          <JText value={description} color={color} whiteSpace='wrap' align='center' />
        </div>
      </div>
    )
  }
}

export default JThumbnail
