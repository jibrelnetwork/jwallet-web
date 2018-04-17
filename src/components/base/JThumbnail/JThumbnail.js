// @flow

import React from 'react'
import classNames from 'classnames'

import JText from 'components/base/JText'

const JThumbnail = ({
  image,
  color,
  title,
  description,
}: Props) => (
  <div className='j-thumbnail' >
    <div className={classNames('image', `-${image}`, `-${color}`)} />
    {title && (
      <div className='title'>
        <JText value={title} color={color} size='header' />
      </div>
    )}
    <div className='description'>
      <JText value={description} color={color} />
    </div>
  </div>
)

type Props = {
  title: string,
  image: string,
  description: string,
  color: 'white' | 'gray',
}

JThumbnail.defaultProps = {
  image: 'cloud',
  title: '',
  description: '',
  color: 'white',
}

export default JThumbnail
