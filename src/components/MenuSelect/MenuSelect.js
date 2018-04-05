// @flow

import React from 'react'
import classNames from 'classnames'

import JLoader from 'components/base/JLoader'
import handle from 'utils/eventHandlers/handle'

const MenuSelect = ({ toggle, setActive, options, active, isOpen }: Props) => (
  <div onClick={handle(toggle)(!isOpen)} className='menu-select'>
    {active && options[active] ? (
      <div className='current'>
        {options[active]}
      </div>
    ) : (
      <div className='current -loading'>
        <JLoader />
      </div>
    )}
    <ul className={classNames('options', { '-active': isOpen })}>
      {Object.keys(options).map((key: string) => {
        const isActive: boolean = (key === active)

        return (
          <li
            key={key}
            onClick={!isActive && handle(setActive)(key)}
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
  active: ?string,
  isOpen: boolean,
}

export default MenuSelect
