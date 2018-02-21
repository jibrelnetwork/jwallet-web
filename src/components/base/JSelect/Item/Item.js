import React from 'react'
import { pure } from 'recompose'
import classNames from 'classnames'

import JText from '../../JText'
import JIcon from '../../JIcon'

type Props = {
  id: number | string,
  icon: string,
  title: string,
  index: number,
  active: ?bool,
  description: string,
  onClick: (itemId) => void,
}

const Item = ({
  id,
  icon,
  title,
  active,
  onClick,
  description,
}: Props) => (
  <div
    onClick={() => onClick(id)}
    className={classNames('Item', { '-active': active })}
  >
    <div className='title'>
      <JText value={title} />
    </div>
    <div className='description'>
      <JText value={description} />
    </div>
    <div className='icon'>
      <JIcon name={icon} />
    </div>
  </div>
)

export default pure(Item)
