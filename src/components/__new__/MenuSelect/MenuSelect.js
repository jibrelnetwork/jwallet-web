// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'

const MenuSelect = ({ toggle, setActive, options, active, isOpen }: Props) => (
  <div onClick={handle(toggle)(!isOpen)} className='menu-select'>
    <div className='current'>
      {options[active]}
    </div>
    <ul className={classNames('options', { '-active': isOpen })}>
      {Object.keys(options).map((key: string) => {
        const isActive: boolean = (key === active)

        return (
          <li
            key={key}
            onClick={isActive && handle(setActive)(key)}
            className={classNames('item', { '-active': isActive })}
          >
            <div className='value'>{options[key]}</div>
          </li>
        )
      })}
    </ul>
  </div>
)

type Props = {
  toggle: Function,
  setActive: Function,
  options: { [string]: string },
  active: string,
  isOpen: boolean,
}

export default MenuSelect
