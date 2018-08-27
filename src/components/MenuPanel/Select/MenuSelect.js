// @flow

import React from 'react'
import classNames from 'classnames'
import { JIcon, JLoader, JText } from 'react-components'

import handle from 'utils/eventHandlers/handle'

const MenuSelect = ({ toggle, setActive, options, name, active, isOpen }: Props) => (
  <div
    onClick={handle(toggle)(isOpen ? null : name)}
    className={classNames('menu-select', isOpen && '-active')}
  >
    {active && options[active] ? (
      <div className='current'>
        <JText value={options[active]} />
      </div>
    ) : (
      <div className='current -loading'>
        <JLoader color='white' />
      </div>
    )}
    {isOpen && <div onClick={handle(toggle)(null)} className='overlay' />}
    <ul className='options'>
      {Object.keys(options).map((key: string) => {
        const isActive: boolean = (key === active)

        return (
          <li
            key={key}
            onClick={!isActive && handle(setActive)(key)}
            className={classNames('item', isActive && '-active')}
          >
            <div className='value'>
              <JText value={options[key]} />
            </div>
            {isActive && (
              <div className='icon'>
                <JIcon name='checkbox' size='small' />
              </div>
            )}
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
  name: ?string,
  active: ?string,
  isOpen: boolean,
}

export default MenuSelect
