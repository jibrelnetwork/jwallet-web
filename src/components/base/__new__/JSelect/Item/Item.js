import React from 'react'
import { pure } from 'recompose'
import classNames from 'classnames'

import JText from '../../JText'
import JIcon from '../../JIcon'
import './Item.scss'

type Props = {
  id: number | string,
  icon: string,
  title: string,
  index: number,
  header?: string,
  selected?: boolean,
  description: string,
  onClick: (itemId) => void,
}

const Item = ({
  id,
  icon,
  title,
  header,
  onClick,
  selected,
  description,
}: Props) => (
  <div
    onClick={() => onClick(id)}
    className={classNames('Item', { '-selected': selected })}
  >
    <div className='info'>
      <div className='title'>
        <JText
          value={selected ? header : title}
          variants={selected
            ? ['small', 'uppercase', 'gray', 'transparent']
            : ['regular', 'bold', 'gray']}
        />
      </div>
      <div className='description'>
        <JText
          value={selected ? `${title}: ${description}` : description}
          variants={selected
            ? ['large', 'bold', 'gray']
            : ['regular', 'uppercase', 'gray', 'transparent']}
        />
      </div>
    </div>
    <div className='icon'>
      <JIcon
        name={icon}
        size='large'
        transparent
      />
    </div>
  </div>
)

Item.defaultProps = {
  header: undefined,
  selected: false,
}

export default pure(Item)
