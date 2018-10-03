// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JLoader, JText } from 'components/base'

const MenuSelect = ({ toggle, setActive, options, name, active, isOpen }: Props) => (
  <div
    onClick={handle(toggle)(isOpen ? undefined : name)}
    className={classNames('menu-select', { '-active': isOpen })}
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
    <div className='options'>
      {Object.keys(options).map((key: string) => {
        const isActive: boolean = (key === active)

        return (
          <div
            key={key}
            onClick={!isActive ? handle(setActive)(key) : undefined}
            className={classNames('item', { '-active': isActive })}
          >
            <div className='value'>
              <JText value={options[key]} />
            </div>
            {isActive && (
              <div className='icon'>
                <JIcon name='checkbox' size='small' />
              </div>
            )}
          </div>
        )
      })}
    </div>
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

MenuSelect.defaultProps = {
  toggle: () => {},
  setActive: () => {},
  options: {},
  name: null,
  active: null,
  isOpen: false,
}

export default MenuSelect
