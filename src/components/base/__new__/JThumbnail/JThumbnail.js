import React from 'react'
import { pure } from 'recompose'

import JText from '../JText'
import JIcon from '../JIcon'

type Props = {
  color: 'white' | 'gray',
  title: ?string,
  image: string,
  description: string,
}

const JThumbnail = ({
  image,
  color,
  title,
  description,
}: Props) => (
  <div className='jThumbnail' >
    <div className='image'>
      <JIcon
        name={image}
        size='huge'
      />
    </div>
    {title &&
      <div className='title'>
        <JText
          value={title}
          variants={['header', 'center', color]}
        />
      </div>
    }
    <div className='description'>
      <JText
        value={description}
        variants={['normal', 'transparent', 'center', color]}
      />
    </div>
  </div>
)

export default pure(JThumbnail)
