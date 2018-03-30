import React from 'react'
import classNames from 'classnames'

import JText from '../../JText'
import JIcon from '../../JIcon'
import './Item.scss'

const Item = ({
  id,
  type,
  icon,
  title,
  header,
  active,
  onClick,
  selected,
  description,
}: Props) => (
  <div
    onClick={() => onClick(id)}
    className={classNames(
      'Item',
      `-${type}`, {
        '-active': active,
        '-selected': selected,
      }
    )}
  >
    {{
      token: [
        <div className='data' key='data'>
          <div className='title'>
            <JText
              value={selected ? header : title}
              variants={selected
                ? ['small', 'uppercase', 'transparent', active ? 'blue' : 'gray']
                : ['regular', 'bold', 'gray']}
            />
          </div>
          <div className='description'>
            <JText
              value={selected ? `${title}: ${description}` : description}
              variants={selected
                ? ['large', 'bold', active ? 'blue' : 'gray']
                : ['regular', 'uppercase', 'gray', 'transparent']}
            />
          </div>
        </div>,
        <div className='icon' key='icon'>
          <JIcon
            name={`${icon}-${active ? 'blue' : 'gray'}`}
            size='large'
            transparent={!active}
          />
        </div>,
      ],
    }[type]}
  </div>
)

type Props = {
  id: number | string,
  icon: string,
  type: 'token',
  title: string,
  index: number,
  active?: boolean,
  header?: string,
  selected?: boolean,
  description: string,
  onClick: (itemId) => void,
}

Item.defaultProps = {
  header: undefined,
  active: false,
  selected: false,
}

export default Item
