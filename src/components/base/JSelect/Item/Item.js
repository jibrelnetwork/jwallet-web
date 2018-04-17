import React from 'react'
import classNames from 'classnames'

import JText from '../../JText'
import JIcon from '../../JIcon'

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
              fontCase={selected ? 'upper' : null}
              color={(selected && active) ? 'blue' : 'gray'}
              size={selected ? 'small' : null}
              weight={selected ? 'bold' : null}
            />
          </div>
          <div className='description'>
            <JText
              value={selected ? `${title}: ${description}` : description}
              fontCase={selected ? null : 'upper'}
              color={(selected && active) ? 'blue' : 'gray'}
              size={selected ? 'large' : null}
              weight={selected ? 'bold' : null}
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
