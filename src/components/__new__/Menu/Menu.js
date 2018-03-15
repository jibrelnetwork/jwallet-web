// @flow

import React from 'react'

import JLogo from 'components/base/__new__/JLogo'
import { MenuLink, MenuSelect } from 'components/__new__'

const Menu = () => (
  <div className='menu'>
    <JLogo />
    <div className='links'>
      <MenuLink path='/funds/send' icon='send' />
      <MenuLink path='/funds/receive' icon='receive' />
    </div>
    <div className='selects'>
      <MenuSelect
        setActive={console.log}
        options={{ en: 'English', ko: 'Korean', zh: 'Chinese', ja: 'Japanese' }}
        active='en'
      />
      <MenuSelect
        setActive={console.log}
        options={{ '1': 'Main', '3': 'Ropsten', '*': 'Localhost 8545' }}
        active='1'
      />
    </div>
  </div>
)

export default Menu
