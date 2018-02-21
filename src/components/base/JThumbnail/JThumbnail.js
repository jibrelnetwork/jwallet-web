import React from 'react'
import { pure } from 'recompose'

import JText from '../JText'
import JIcon from '../JIcon'
import './JThumbnail.scss'

type Props = {
  icon: string,
  title: ?string,
  description: string,
}

const JThumbnail = ({ icon, title, description }: Props) => (
  <div className='JThumbnail' >
    <div className='icon'>
      <JIcon name={icon} />
    </div>
    {title &&
      <div className='title'>
        <JText value={title} />
      </div>
    }
    <div className='description'>
      <JText value={description} />
    </div>
  </div>
)

export default pure(JThumbnail)
