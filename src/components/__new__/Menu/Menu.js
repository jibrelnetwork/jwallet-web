// @flow

import React from 'react'

import JLogo from 'components/base/__new__/JLogo'
import { MenuLink, MenuSelect } from 'components/__new__'

const Menu = ({
  setNetwork,
  networks,
  currentNetwork,
}: Props) => (
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
        setActive={setNetwork}
        options={networks}
        active={currentNetwork}
      />
    </div>
  </div>
)

type Props = {
  setNetwork: Function,
  networks: { [NetworkId]: string },
  currentNetwork: ?NetworkId,
}

export default Menu
